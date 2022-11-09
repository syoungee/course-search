export enum PRICE {
  CHARGED = 'charged',
  FREE = 'free',
}

export type DataProps = {
  title: string;
  price: Array<PRICE>;
  pageIndex: number;
};

export type Course = {
  title: string;
  short_description: string;
  info_summary_visibility_dict: {
    level: boolean;
    class_type: boolean;
    period: number;
  };
  period: number;
  logo_file_url: string;
  enroll_type: number;
  is_free: boolean;
};

export type Courses = { courses: Array<Course> };
