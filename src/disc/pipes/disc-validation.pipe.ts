import { BadRequestException, PipeTransform } from '@nestjs/common';
import { CreateDiscDto } from '../dto/create-disc.dto';
import {
  AxiomMold,
  AxiomPlastic,
  DgaMold,
  DgaPlastic,
  DiscmaniaMold,
  DiscmaniaPlastic,
  DiscraftMold,
  DiscraftPlastic,
  DynamicMold,
  DynamicPlastic,
  GatewayMold,
  GatewayPlastic,
  InnovaMold,
  InnovaPlastic,
  KastaplastMold,
  KastaplastPlastic,
  LatitudeMold,
  LatitudePlastic,
  LegacyMold,
  LegacyPlastic,
  Manufacturer,
  MvpMold,
  MvpPlastic,
  ProdigyMold,
  ProdigyPlastic,
  ProdiscusMold,
  ProdiscusPlastic,
  StreamlineMold,
  StreamlinePlastic,
  WestsideMold,
  WestsidePlastic,
} from '../mfr-mold.type';

export class DiscValidationPipe implements PipeTransform {
  transform(createDiscDto: CreateDiscDto): CreateDiscDto {
    if (
      (createDiscDto.manufacturer === Manufacturer.AXIOM &&
        AxiomMold.includes(createDiscDto.mold) &&
        AxiomPlastic.includes(createDiscDto.plastic)) ||
      (createDiscDto.manufacturer === Manufacturer.DGA &&
        DgaMold.includes(createDiscDto.mold) &&
        DgaPlastic.includes(createDiscDto.plastic)) ||
      (createDiscDto.manufacturer === Manufacturer.DISCMANIA &&
        DiscmaniaMold.includes(createDiscDto.mold) &&
        DiscmaniaPlastic.includes(createDiscDto.plastic)) ||
      (createDiscDto.manufacturer === Manufacturer.DISCRAFT &&
        DiscraftMold.includes(createDiscDto.mold) &&
        DiscraftPlastic.includes(createDiscDto.plastic)) ||
      (createDiscDto.manufacturer === Manufacturer.DYNAMIC &&
        DynamicMold.includes(createDiscDto.mold) &&
        DynamicPlastic.includes(createDiscDto.plastic)) ||
      (createDiscDto.manufacturer === Manufacturer.GATEWAY &&
        GatewayMold.includes(createDiscDto.mold) &&
        GatewayPlastic.includes(createDiscDto.plastic)) ||
      (createDiscDto.manufacturer === Manufacturer.INNOVA &&
        InnovaMold.includes(createDiscDto.mold) &&
        InnovaPlastic.includes(createDiscDto.plastic)) ||
      (createDiscDto.manufacturer === Manufacturer.KASTAPLAST &&
        KastaplastMold.includes(createDiscDto.mold) &&
        KastaplastPlastic.includes(createDiscDto.plastic)) ||
      (createDiscDto.manufacturer === Manufacturer.LATITUDE &&
        LatitudeMold.includes(createDiscDto.mold) &&
        LatitudePlastic.includes(createDiscDto.plastic)) ||
      (createDiscDto.manufacturer === Manufacturer.LEGACY &&
        LegacyMold.includes(createDiscDto.mold) &&
        LegacyPlastic.includes(createDiscDto.plastic)) ||
      (createDiscDto.manufacturer === Manufacturer.MVP &&
        MvpMold.includes(createDiscDto.mold) &&
        MvpPlastic.includes(createDiscDto.plastic)) ||
      (createDiscDto.manufacturer === Manufacturer.PRODIGY &&
        ProdigyMold.includes(createDiscDto.mold) &&
        ProdigyPlastic.includes(createDiscDto.plastic)) ||
      (createDiscDto.manufacturer === Manufacturer.PRODISCUS &&
        ProdiscusMold.includes(createDiscDto.mold) &&
        ProdiscusPlastic.includes(createDiscDto.plastic)) ||
      (createDiscDto.manufacturer === Manufacturer.STREAMLINE &&
        StreamlineMold.includes(createDiscDto.mold) &&
        StreamlinePlastic.includes(createDiscDto.plastic)) ||
      (createDiscDto.manufacturer === Manufacturer.WESTSIDE &&
        WestsideMold.includes(createDiscDto.mold) &&
        WestsidePlastic.includes(createDiscDto.plastic))
    ) {
      return createDiscDto;
    }

    throw new BadRequestException(
      `${createDiscDto.mold} in ${createDiscDto.plastic} was not found to exist under ${createDiscDto.manufacturer}`,
    );
  }
}
