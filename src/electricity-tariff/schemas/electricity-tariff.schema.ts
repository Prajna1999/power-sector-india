import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class ElectricityTariff extends Document {
  @Prop({ required: true })
  state: string;

  @Prop({required:true})
  stateCode:string;

  @Prop({ required: true })
  effectiveDate: Date;

  @Prop({ required: true })
  supplyType: string; // HT or LT

  @Prop({ required: true })
  category: string;

  @Prop()
  subcategory: string;

  @Prop()
  consumerType: string;

  @Prop()
  voltageLevel: string;

  @Prop({type:Object})
  tariffDetails:Record<string,any>

  @Prop({ type: Object })
  fixedCharges: Record<string, any>;

  @Prop({ type: Object })
  energyCharges: Record<string, any>;

  @Prop({ type: Object })
  demandCharges: Record<string, any>;

  @Prop({ type: Object })
  timeOfDayCharges: Record<string, any>;

  @Prop()
  governmentSubsidy: boolean;

  @Prop()
  subsidyDetails: string;
  @Prop()
  specialProvisions:Record<string, any>[];
  @Prop()
  billingCycle:string;
}

export const ElectricityTariffSchema = SchemaFactory.createForClass(ElectricityTariff);

// Create a compound index
ElectricityTariffSchema.index({ state: 1, effectiveDate: 1, supplyType: 1, category: 1 });