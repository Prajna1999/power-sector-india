import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import mongoose, { isValidObjectId, Model, mongo } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateElectricityTariffDto } from './dto/create-electricity-tariff.dto';
import { UpdateElectricityTariffDto } from './dto/update-electricity-tariff.dto';
import { ElectricityTariff } from './schemas/electricity-tariff.schema';
import { stat } from 'fs';

@Injectable()
export class ElectricityTariffService {
 constructor(
  @InjectModel(ElectricityTariff.name) private electricityTariffModel:Model<ElectricityTariff>
 ){}

 async createElectricityTariff(createDto:CreateElectricityTariffDto):Promise<ElectricityTariff>{
    await this.checkDuplicate(createDto);
    const createdTariff=new this.electricityTariffModel(createDto);
    try{
        return await createdTariff.save();
    }catch(error){
        throw new BadRequestException('Invalid data: ', error.message);
    }
 }

 async updateElectricityTariff(id:string,updateDto:UpdateElectricityTariffDto):Promise<ElectricityTariff>{
    this.validateId(id);
    await this.checkDuplicate(updateDto,id);
    const existingTariff=await this.electricityTariffModel.findByIdAndUpdate(
        id, updateDto, {new:true}
    ).exec();

    if(!existingTariff){
        throw new NotFoundException(`Electricity Tariff with ID ${id} not found.`);
    };

    return existingTariff;

 }
 private async checkDuplicate(tariff:Partial<ElectricityTariff>, excludeId?:string):Promise<void>{
    const query={
        state:tariff.state,
        effectiveDate:tariff.effectiveDate,
        supplyType:tariff.supplyType,
        category:tariff.category,
        consumerType:tariff.consumerType
    };

    if(excludeId){
        Object.assign(query, {_id:{$ne:excludeId}})
    }
    const existingTariff=await this.electricityTariffModel.findOne(query).exec();
    if(existingTariff){
        throw new ConflictException('A tariff with the same state, effective date, supply type, consumer type and category already exists');
    }


 }

 private validateFilters(filters: Partial<ElectricityTariff>): void {
    const allowedFields = ['state','stateCode', 'effectiveDate', 'supplyType', 'category', 'subcategory', 'consumerType', 'voltageLevel', 'governmentSubsidy'];
    const invalidFields = Object.keys(filters).filter(key => !allowedFields.includes(key));
    if (invalidFields.length > 0) {
      throw new BadRequestException(`Invalid filter fields: ${invalidFields.join(', ')}`);
    }

    if (filters.effectiveDate && !(filters.effectiveDate instanceof Date)) {
      throw new BadRequestException('effectiveDate must be a valid Date object');
    }

    if (filters.supplyType && !['HT', 'LT'].includes(filters.supplyType)) {
      throw new BadRequestException('supplyType must be either "HT" or "LT"');
    }

    if (filters.governmentSubsidy !== undefined && typeof filters.governmentSubsidy !== 'boolean') {
      throw new BadRequestException('governmentSubsidy must be a boolean');
    }
  }
private validateId(id:any):void{
    
    if(typeof id==='object' && id!==null){
        id=id.toString();
    }

    if(typeof id!=='string'){
        throw new BadRequestException(`Invalid ID format :${JSON.stringify(id)}`);
    }

    if(!mongoose.Types.ObjectId.isValid(id)){
        throw new BadRequestException(`Invalid MongoDB ObjectId format:${id}`);
    }
  }
}
