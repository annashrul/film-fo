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

export interface iQuiz {
  totalrecords: string;
  id: string;
  slug_project: string;
  id_project: string;
  question: string;
  choise: [
    {
      id: string;
      answer: string;
      is_right: string;
    },
  ];
}
