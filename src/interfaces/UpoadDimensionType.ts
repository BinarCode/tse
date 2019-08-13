import upload from '@config/upload';

export type Dimension = keyof (typeof upload.dimensions);
