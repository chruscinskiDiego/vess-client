export interface IAvaliationHistory {
    id_avaliation: number;
    description: string;
    infos: string;
    file_link?: string;
    created_at: string;
}

export interface INewAvaliationSample {
    name: string;
    num_layers: number,
    score: number;
}

// camada de cada amostra
export interface INewAvaliationSampleLayer {
  length: number;
  note: number;
}

// localização de cada amostra
export interface INewAvaliationSampleLocation {
  latitude: number;
  longitude: number;
}

// uma amostra dentro da avaliação
export interface INewAvaliationSample {
  name: string;
  num_layers: number;                             // mantém o controle de quantas camadas existem
  score: number;
  sample_layers: INewAvaliationSampleLayer[];     // array de camadas
  sample_location: INewAvaliationSampleLocation;  // lat/lng
}

// payload completo da avaliação
export interface INewAvaliation {
  description: string;
  management_decision: string;
  summary: string;
  infos: string;
  user_id: number;
  sample_avaliation: INewAvaliationSample[];      // array de amostras
}