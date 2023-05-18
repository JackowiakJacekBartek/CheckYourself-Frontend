export interface ReturnedResponse<TModel>  {
    errorMessage: string;
    isSuccess: boolean;
    errorCode: number;
    methodResult: TModel
}