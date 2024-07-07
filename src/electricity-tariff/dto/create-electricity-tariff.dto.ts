import { Type } from "class-transformer";
import { IsBoolean, IsDate, IsIn, IsObject, IsOptional, IsString } from "class-validator";

export class CreateElectricityTariffDto {

    @IsString()
    state:string;

    @IsString()
    stateCode:string;

    @IsDate()
    @Type(()=>Date)
    effectiveDate:Date;

    @IsString()
    @IsIn(['HT', 'LT'])
    supplyType:string;

    @IsString()
    category:string;

    @IsString()
    @IsOptional()
    subcategory?:string;

    @IsString()
    @IsOptional()
    consumerType?:string;

    @IsString()
    @IsOptional()
    voltageLevel?:string;

    @IsObject()
    @IsOptional()
    tariffDetails?:Record<string,any>;

    @IsObject()
    @IsOptional()
    fixedCharges?:Record<string,any>;

    @IsObject()
    @IsOptional()
    demandCharges?:Record<string,any>

    @IsObject()
    @IsOptional()
    timeOfDayCharges?:Record<string, any>;

    @IsString()
    @IsOptional()
    subsidyDetails?:string;

    @IsObject()
    @IsOptional()
    specialProvisions?:Record<string,any>[];

    @IsBoolean()
    governmentSubsidy:boolean;

    @IsString()
    @IsIn(['Monthly', 'Bi-Monthly'])
    billingCycle:string;
}
