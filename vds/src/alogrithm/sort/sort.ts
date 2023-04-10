export interface ISort{
    sort(elements: number[]): void;   
    // sortByOrderType(elements: number[], orderType: string): void; 
}

export const OrderType = {
    ASC: 'ASC',
    DESC: 'DESC'
}
