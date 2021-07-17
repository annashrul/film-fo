import React, { useState,useEffect } from 'react';
import { Modal, ModalBody, ModalFooter, Button } from '@windmill/react-ui';
import Api from 'lib/httpService';
import Helper from 'lib/helper';
import { handlePut, handlePost, handleGet } from 'lib/handleAction';
// import { useRouter } from 'next/router'
import { useToasts } from 'react-toast-notifications'
// import Sess from "lib/auth";

import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import { iProject, iTenant } from 'lib/interface';


interface iModalTenant {
  open: boolean;
  closeModal: () => void;
  data: any;
}
const ModalTenant: React.FC<iModalTenant> = ({ open, closeModal, data }) => {
  const [datumTenant,setDatumTenant]= useState<Array<iTenant>>([]);
  const [datumProject,setDatumProject]= useState<Array<iProject>>([]);
  const { addToast } = useToasts();
  const [ftitle,setFtitle]=useState("");
  const [faddress,setFaddress]=useState("");
  const [fprice,setFprice]=useState("");
  const [fprovinsi,setFprovinsi]=useState("");
  const [fkota,setFkota]=useState("");
  const [fkecamatan,setFkecamatan]=useState("");
  const [fpostal_code,setFpostal_code]=useState("");
  const [fresponsible,setFresponsible]=useState("");
  const [fresponsible_no,setFresponsible_no]=useState("");
  const [fstatus,setFstatus]=useState("");
  const [fproject,setFproject]=useState("");
  const [flogo,setFlogo]=useState("");
  const [cropper, setCropper] = useState<any>();
  // const router = useRouter()

  useEffect(()=>{
    console.log(data);
    if(data.id!==undefined){
      handleLoadData();
      setFtitle(data.title)
      setFaddress(data.address)
      setFprice(data.price)
      setFprovinsi(data.provinsi)
      setFkota(data.kota)
      setFkecamatan(data.kecamatan)
      setFpostal_code(data.postal_code)
      setFresponsible(data.responsible)
      setFresponsible_no(data.responsible_no)
      setFstatus(data.status)
      setFproject(data.id_project)
    } else {
      setFtitle("")
      setFaddress("")
      setFprice("")
      setFprovinsi("")
      setFkota("")
      setFkecamatan("")
      setFpostal_code("")
      setFresponsible("")
      setFresponsible_no("")
      setFstatus("")
      setFproject("")
    }
  },[])

  const toggleModal = () => {
    closeModal();
  };

  const onChange = (e: any) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setFlogo(reader.result as any);
    };
    reader.readAsDataURL(files[0]);
  };

  const handleSubmit= async () => {
    let datum: any = {};
    if(ftitle===""){
      addToast("Title tidak boleh kosong.", {
          appearance: 'error',
          autoDismiss: true,
      })
    } else if(cropper.getCroppedCanvas() === null){
      addToast("Poster tidak boleh kosong.", {
          appearance: 'error',
          autoDismiss: true,
      })
    } else if(faddress===""){
      addToast("Address tidak boleh kosong.", {
          appearance: 'error',
          autoDismiss: true,
      })
    } else if(fprice===""){
      addToast("Price tidak boleh kosong.", {
          appearance: 'error',
          autoDismiss: true,
      })
    } else if(fprovinsi===""){
      addToast("Provinsi belum dipilih.", {
          appearance: 'error',
          autoDismiss: true,
      })
    } else if(fkota===""){
      addToast("Kota belum dipilih.", {
          appearance: 'error',
          autoDismiss: true,
      })
    } else if(fkecamatan===""){
      addToast("Kecamatan belum dipilih.", {
          appearance: 'error',
          autoDismiss: true,
      })
    } else if(fpostal_code===""){
      addToast("Postal kode tidak boleh kosong.", {
          appearance: 'error',
          autoDismiss: true,
      })
    } else if(fresponsible===""){
      addToast("Responsible tidak boleh kosong.", {
          appearance: 'error',
          autoDismiss: true,
      })
    } else if(fresponsible_no===""){
      addToast("Responsible no tidak boleh kosong.", {
          appearance: 'error',
          autoDismiss: true,
      })
    } else if(fstatus===""){
      addToast("Status belum dipilih.", {
          appearance: 'error',
          autoDismiss: true,
      })
    } else if(fproject===""){
      addToast("Project belum dipilih.", {
          appearance: 'error',
          autoDismiss: true,
      })
    } else {
      Object.assign(datum, {
        'title': ftitle,
        'logo': cropper.getCroppedCanvas().toDataURL(),
        'address': faddress,
        'price': fprice,
        'provinsi': fprovinsi,
        'kota': fkota,
        'kecamatan': fkecamatan,
        'postal_code': fpostal_code,
        'responsible': fresponsible,
        'responsible_no': fresponsible_no,
        'status': fstatus,
        'id_project': fproject
      })
    }
    
    if(Helper.isEmptyObj(datum)){
      console.log(datum);
      addToast("Tidak ada perubahan.", {
          appearance: 'error',
          autoDismiss: true,
      })

    }else{
      if(data.id!==undefined){
          await handlePut(Api.apiClient + `tenant/${data.id}`, datum, async (datum) => {
            addToast(datum.msg, {
                appearance: 'success',
                autoDismiss: true,
            })
            closeModal();
          });
      } else {
        await handlePost(Api.apiClient + `tenant`, datum, async (datum) => {
          addToast(datum.msg, {
              appearance: 'success',
              autoDismiss: true,
          })
          closeModal();
        });
      }
    }
  };

  const handleLoadData = async () => {
    let url = Api.apiClient+`project?perpage=99999`;
    await handleGet(url,(datum)=>{
      console.log(datum.data);
        setDatumProject(datum.data);
    })
   
}

  return (
    <Modal isOpen={open} onClose={toggleModal}>
      <form>
        <ModalBody>
          <div className="w-full items-center justify-items-center p-0">
            {/* Edit Tenant */}
            <div className="bg-white dark:bg-gray-800 p-3 shadow-lg rounded-lg">
              <div className="flex items-center space-x-2 font-semibold text-gray-900 dark:text-gray-200 leading-8 mb-3">
                <span className="tracking-wide">{data.id!==undefined?"Edit":""} Tenant</span>
              </div>
              <div className="grid grid-cols-1">
                <label className="block mt-4 text-sm">
                    <span className="text-gray-700 dark:text-gray-400">Title</span>
                    <input
                      className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                      name="title"
                      value={ftitle}
                      onChange={(event)=>setFtitle(event.target.value)}
                      placeholder="Title"
                    />
                  </label>
              </div>
              <div className="grid grid-cols-1">
                <label className="block mt-4 text-sm">
                    <span className="text-gray-700 dark:text-gray-400">Logo</span>
                    <input
                      type="file"
                      className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                      name="logo"
                      onChange={(e) => onChange(e)}
                    />
                  </label>
                  <div className="flex w-full h-52 relative bg-white">
                    <Cropper
                      initialAspectRatio={1}
                      aspectRatio={1}
                      preview=".img-preview"
                      src={flogo}
                      viewMode={1}
                      guides={true}
                      minCropBoxHeight={10}
                      minCropBoxWidth={10}
                      background={false}
                      responsive={true}
                      autoCropArea={1}
                      checkOrientation={false} 
                      onInitialized={(instance:any) => {
                        setCropper(instance);
                      }}
                    />
                  </div>
                    <span className="text-gray-700 dark:text-gray-400 text-xs mt-2">Silahkan geser kekiri/kekanan atau zoom-in/zoom-out untuk menyesuaikan gambar dengan area kotak.</span>
                  
              </div>
              <div className="grid grid-cols-1">
                <label className="block mt-4 text-sm">
                    <span className="text-gray-700 dark:text-gray-400">Price</span>
                    <input
                      className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                      name="price"
                      value={fprice}
                      onChange={(event)=>setFprice(event.target.value)}
                      placeholder="Ex: 100000"
                    />
                  </label>
              </div>
              <div className="grid grid-cols-1">
                <label className="block mt-4 text-sm">
                    <span className="text-gray-700 dark:text-gray-400">Responsible</span>
                    <input
                      className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                      name="responsible"
                      value={fresponsible}
                      onChange={(event)=>setFresponsible(event.target.value)}
                      placeholder="Ex: Dadang N"
                    />
                  </label>
              </div>
              <div className="grid grid-cols-1">
                <label className="block mt-4 text-sm">
                    <span className="text-gray-700 dark:text-gray-400">Responsible No</span>
                    <input
                      className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                      name="responsible_no"
                      value={fresponsible_no}
                      onChange={(event)=>setFresponsible_no(event.target.value)}
                      placeholder="Ex: 6289876543212"
                    />
                  </label>
              </div>
              <div className="grid grid-cols-1">
                <label className="block mt-4 text-sm">
                    <span className="text-gray-700 dark:text-gray-400">Provinsi</span>
                      <select 
                          className="block w-full mt-1 px-4 py-3 text-sm dark:border-gray-600 dark:bg-gray-700 focus:outline-none  dark:text-gray-300 div-input" 
                          value={fprovinsi}
                          onChange={(event) => {
                              event.preventDefault();
                              setFprovinsi(event.target.value);
                          }}
                          // onKeyPress={event => { if (event.key === 'Enter') { handleSearch(''); } }}
                      >
                        <option value="" >~~Pilih Provinsi~~</option>
                        <option value="1" >Dummy</option>
                        {
                        datumProject?.length>0?datumProject.map((item:iProject,i:number)=>{
                          return(
                            <option value={item.id} key={i}>{item.title}</option>
                          );
                        }):<option value="0">No data</option>
                        }
                      </select>
                  </label>
              </div>
              <div className="grid grid-cols-1">
                <label className="block mt-4 text-sm">
                    <span className="text-gray-700 dark:text-gray-400">Kota</span>
                      <select 
                          className="block w-full mt-1 px-4 py-3 text-sm dark:border-gray-600 dark:bg-gray-700 focus:outline-none  dark:text-gray-300 div-input" 
                          value={fkota}
                          onChange={(event) => {
                              event.preventDefault();
                              setFkota(event.target.value);
                          }}
                          // onKeyPress={event => { if (event.key === 'Enter') { handleSearch(''); } }}
                      >
                        <option value="" >~~Pilih Kota~~</option>
                        <option value="1" >Dummy</option>
                        {
                        datumProject?.length>0?datumProject.map((item:iProject,i:number)=>{
                          return(
                            <option value={item.id} key={i}>{item.title}</option>
                          );
                        }):<option value="0">No data</option>
                        }
                      </select>
                  </label>
              </div>
              <div className="grid grid-cols-1">
                <label className="block mt-4 text-sm">
                    <span className="text-gray-700 dark:text-gray-400">Kecamatan</span>
                      <select 
                          className="block w-full mt-1 px-4 py-3 text-sm dark:border-gray-600 dark:bg-gray-700 focus:outline-none  dark:text-gray-300 div-input" 
                          value={fkecamatan}
                          onChange={(event) => {
                              event.preventDefault();
                              setFkecamatan(event.target.value);
                          }}
                          // onKeyPress={event => { if (event.key === 'Enter') { handleSearch(''); } }}
                      >
                        <option value="" >~~Pilih Kecamatan~~</option>
                        <option value="1" >Dummy</option>
                        {
                        datumProject?.length>0?datumProject.map((item:iProject,i:number)=>{
                          return(
                            <option value={item.id} key={i}>{item.title}</option>
                          );
                        }):<option value="0">No data</option>
                        }
                      </select>
                  </label>
              </div>
              <div className="grid grid-cols-1">
                <label className="block mt-4 text-sm">
                    <span className="text-gray-700 dark:text-gray-400">Alamat lengkap</span>
                    <input
                      className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                      name="address"
                      value={faddress}
                      onChange={(event)=>setFaddress(event.target.value)}
                      placeholder="Ex: Jl. Bali no 30 Bandung"
                    />
                  </label>
              </div>
              <div className="grid grid-cols-1">
                <label className="block mt-4 text-sm">
                    <span className="text-gray-700 dark:text-gray-400">Postal Kode</span>
                    <input
                      className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                      name="postal_code"
                      value={fpostal_code}
                      onChange={(event)=>setFpostal_code(event.target.value)}
                      placeholder="Ex: 40554"
                    />
                  </label>
              </div>
              <div className="grid grid-cols-1">
                <label className="block mt-4 text-sm">
                    <span className="text-gray-700 dark:text-gray-400">Project</span>
                      <select 
                          className="block w-full mt-1 px-4 py-3 text-sm dark:border-gray-600 dark:bg-gray-700 focus:outline-none  dark:text-gray-300 div-input" 
                          value={fproject}
                          onChange={(event) => {
                              event.preventDefault();
                              setFproject(event.target.value);
                          }}
                          // onKeyPress={event => { if (event.key === 'Enter') { handleSearch(''); } }}
                      >
                        <option value="" >~~Pilih Project~~</option>
                        {
                        datumProject?.length>0?datumProject.map((item:iProject,i:number)=>{
                          return(
                            <option value={item.id} key={i}>{item.title}</option>
                          );
                        }):<option value="0">No data</option>
                        }
                      </select>
                  </label>
              </div>
              <div className="grid grid-cols-1">
                <label className="block mt-4 text-sm">
                    <span className="text-gray-700 dark:text-gray-400">Status</span>
                      <select 
                          className="block w-full mt-1 px-4 py-3 text-sm dark:border-gray-600 dark:bg-gray-700 focus:outline-none  dark:text-gray-300 div-input" 
                          value={fstatus}
                          onChange={(event) => {
                              event.preventDefault();
                              setFstatus(event.target.value);
                          }}
                          // onKeyPress={event => { if (event.key === 'Enter') { handleSearch(''); } }}
                      >
                          <option value="" >~~Pilih Status~~</option>
                          <option value="0">AKTIF</option>
                          <option value="1">NONAKTIF</option>
                      </select>
                  </label>
              </div>
            </div>
            {/* End of Edit Tenant grid */}
          </div>
        </ModalBody>
        <ModalFooter>
          <Button className="w-full sm:w-auto" layout="outline" onClick={toggleModal}>
            Batal
          </Button>
          <Button className="bg-old-gold hover:bg-old-gold-600 w-full sm:w-auto" onClick={handleSubmit}>
          {data.id!==undefined?"Simpan Perubahan":"Simpan"}
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  );
};

export default ModalTenant;
