export interface MassageshopItem {
  _id: string;
  name: string;
  address: string;
  tel: string;
  openclosetime: {
    open: string;
    close: string;
  };
  picture: string;
  __v: number;
}

export interface MassageshopJson {
    success: boolean,
    count: number,
    pagination: Object,
    data: MassageshopItem[]
  }

export interface ReservationItem {
    nameLastname: string;
    tel: string;
    venue: string;
    bookDate: string;
    startTime: string;  // เวลาที่เริ่มการจอง
    endTime: string;    // เวลาที่สิ้นสุดการจอง
  }