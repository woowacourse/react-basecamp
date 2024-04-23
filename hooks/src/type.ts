export interface PixabayResponse {
  total: number,
  totalHits: number,
  hits: Image[]
}

interface Image {
  id: number;
  webformatURL: string;
  tags: string;
}