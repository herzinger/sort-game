export interface Fluid {
  id:    string;
  color: fluidColor;
}

export type fluidColor =
  'red' | 'orange' | 'yellow' | 'green' | 'blue' | 'cyan' |
  'purple' | 'brown' | 'grey' | 'pink' | 'olive' | 'teal'
