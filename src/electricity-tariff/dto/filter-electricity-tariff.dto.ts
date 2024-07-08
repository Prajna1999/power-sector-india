import { IsOptional, IsString, IsDateString, IsIn, IsBoolean } from "class-validator";

export class FilterElectricityDto {
  @IsOptional()
  @IsString()
  state?: string;

  @IsOptional()
  @IsString()
  stateCode?:string;

  @IsOptional()
  @IsDateString()
  effectiveDate?: Date;

  @IsOptional()
  @IsString()
  @IsIn(['HT', 'LT', 'EHT'])
  supplyType?: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsString()
  subcategory?: string;

  @IsOptional()
  @IsString()
  consumerType?: string;

  @IsOptional()
  @IsString()
  voltageLevel?: string;

  @IsOptional()
  @IsBoolean()
  governmentSubsidy?: boolean;
}