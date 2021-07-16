export interface iUser {
  id: string;
  token: string;
  sekolah: string;
  fullname: string;
  kelas: string;
  mobile_no: number;
  ticket: string;
  jenis_kelamin: number;
  slug_tenant: string;
  slug_project: string;
  status: string;
  tanggal_tayang: string;
}
export interface iUserBo {
  id: string;
  token: string;
  name: string;
  username: string;
  foto: string;
  level: number;
  access_level: string;
  status: number;
  created_at: string;
  updated_at: string;
}
export interface iPagin{
  current_page:number;
  total:number;
  per_page:number;
  summary:{
    trx_in:number;
    trx_out:number;
    saldo_awal:number;
  }
}
export interface iProject{
  id:string,
  title:string,
  slug:string,
  total_tenant:string,
  total_penonton:string,
  poster:string,
  video:string,
  durasi:string,
  status:string,
  category:string,
  id_category:string,
  created_at:string,
}
export interface iCategory{
  id:string,
  title:string,
  type:string,
  created_at:string,
  updated_at:string,
}

export interface iTenant {
  id: string;
  id_project: string;
  project: string;
  project_slug: string;
  price: string;
  show_date: string;
  total_penonton: string;
  title: string;
  slug: string;
  logo: string;
  address: string;
  provinsi: string;
  kota: string;
  kecamatan: string;
  postal_code: string;
  responsible: string;
  responsible_no: string;
  status: string;
  poster: string;
  created_at: string;
  updated_at: string;
}

export interface iQuestion{
  id:string,
  slug_project:string,
  id_project:string,
  question:string,
  iChoise:[],
}
export interface iChoise{
  id:string,
  answer_right:string,
  is_right:string
}