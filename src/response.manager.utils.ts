export type paginatedResponse = standardResponse & {
  meta?: meta;
  extradata?: any;
};

export type standardResponse = {
  code: number;
  status: string;
  message: string;
  data?: Array<Record<any, any>> | Record<any, any> | null;
};

export type meta = {
  itemCount: number;
  totalItems: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
};

export class ResponseManager {
  static standardResponse(response: standardResponse) {
    return response;
  }

  public static paginatedResponse(response: paginatedResponse) {
    return response;
  }
}
