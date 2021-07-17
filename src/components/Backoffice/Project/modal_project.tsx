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
import { iCategory } from 'lib/interface';


interface iModalProject {
  open: boolean;
  closeModal: () => void;
  data: any;
}
const ModalProject: React.FC<iModalProject> = ({ open, closeModal, data }) => {
  const [datumCategory,setDatumCategory]= useState<Array<iCategory>>([]);
  const { addToast } = useToasts();
  const [ftitle,setFtitle]=useState("");
  const [fdurasi,setFdurasi]=useState("");
  const [fslug,setFslug]=useState("");
  const [fkategori,setFkategori]=useState("");
  const [fstatus,setFstatus]=useState("");
  const [ftype,setFtype]=useState("0");
  const [poster, setPoster] = useState('');
  const [cropper, setCropper] = useState<any>();
  // const router = useRouter()

  useEffect(()=>{
    if(data.id!==undefined){
      handleLoadData("0");
      setFtitle(data.title)
      setFdurasi(data.durasi)
      setFslug(data.slug)
      setFkategori(data.kategori)
      setFstatus(data.status)
      setFtype("0")
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
      setPoster(reader.result as any);
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
    } else if(fdurasi===""){
      addToast("Durasi tidak boleh kosong.", {
          appearance: 'error',
          autoDismiss: true,
      })
    } else if(fkategori===""){
      addToast("Kategori belum dipilih.", {
          appearance: 'error',
          autoDismiss: true,
      })
    } else if(fstatus===""){
      addToast("Status belum dipilih.", {
          appearance: 'error',
          autoDismiss: true,
      })
    } else {
      Object.assign(datum, {
        'title': ftitle,
        'id_category': fkategori,
        'durasi': fdurasi,
        'status': fstatus,
        'poster': cropper.getCroppedCanvas().toDataURL()
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
        if(fslug===""){
          addToast("Slug tidak boleh kosong.", {
              appearance: 'error',
              autoDismiss: true,
          })
        } else {
          Object.assign(datum, {
            'slug': fslug,
          })
          await handlePut(Api.apiClient + `project/${data.id}`, datum, async (datum) => {
            addToast(datum.msg, {
                appearance: 'success',
                autoDismiss: true,
            })
            closeModal();
          });
        }
      } else {
        await handlePost(Api.apiClient + `project`, datum, async (datum) => {
          addToast(datum.msg, {
              appearance: 'success',
              autoDismiss: true,
          })
          closeModal();
        });
      }
    }
  };

  const handleLoadData = async (type:string) => {
    let url = Api.apiClient+`category?perpage=99999&type=${type}`;
    await handleGet(url,(datum)=>{
      console.log(datum.data);
        setDatumCategory(datum.data);
    })
   
}

  return (
    <Modal isOpen={open} onClose={toggleModal}>
      <form>
        <ModalBody>
          <div className="w-full items-center justify-items-center p-0">
            {/* Edit Project */}
            <div className="bg-white dark:bg-gray-800 p-3 shadow-lg rounded-lg">
              <div className="flex items-center space-x-2 font-semibold text-gray-900 dark:text-gray-200 leading-8 mb-3">
                <span className="tracking-wide">{data.id!==undefined?"Edit":""} Project</span>
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
              {data.id!==undefined?
              <div className="grid grid-cols-1">
                <label className="block mt-4 text-sm">
                    <span className="text-gray-700 dark:text-gray-400">Slug</span>
                    <input
                      className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                      name="slug"
                      value={fslug}
                      onChange={(event)=>setFslug(event.target.value)}
                      placeholder="Slug"
                    />
                  </label>
              </div>
              :''}
              <div className="grid grid-cols-1">
                <label className="block mt-4 text-sm">
                    <span className="text-gray-700 dark:text-gray-400">Poster</span>
                    <input
                      type="file"
                      className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                      name="poster"
                      onChange={(e) => onChange(e)}
                    />
                  </label>
                  <div className="flex w-full h-52 relative bg-white">
                    <Cropper
                      initialAspectRatio={1}
                      aspectRatio={1}
                      preview=".img-preview"
                      src={poster}
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
                    <span className="text-gray-700 dark:text-gray-400">Durasi</span>
                    <input
                      className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                      name="durasi"
                      value={fdurasi}
                      onChange={(event)=>setFdurasi(event.target.value)}
                      placeholder="Durasi"
                    />
                  </label>
              </div>
              <div className="grid grid-cols-1">
                <label className="block mt-4 text-sm">
                    <span className="text-gray-700 dark:text-gray-400">Type</span>
                      <select 
                          className="block w-full mt-1 px-4 py-3 text-sm dark:border-gray-600 dark:bg-gray-700 focus:outline-none  dark:text-gray-300 div-input" 
                          value={ftype}
                          onChange={(event) => {
                              event.preventDefault();
                              setFtype(event.target.value);
                              handleLoadData(event.target.value);
                          }}
                          // onKeyPress={event => { if (event.key === 'Enter') { handleSearch(''); } }}
                      >
                          <option value="" >~~Pilih Type~~</option>
                          <option value="0">NOL</option>
                          <option value="1">SATU</option>
                      </select>
                  </label>
              </div>
              <div className="grid grid-cols-1">
                <label className="block mt-4 text-sm">
                    <span className="text-gray-700 dark:text-gray-400">Kategori</span>
                      <select 
                          className="block w-full mt-1 px-4 py-3 text-sm dark:border-gray-600 dark:bg-gray-700 focus:outline-none  dark:text-gray-300 div-input" 
                          value={fkategori}
                          onChange={(event) => {
                              event.preventDefault();
                              setFkategori(event.target.value);
                          }}
                          // onKeyPress={event => { if (event.key === 'Enter') { handleSearch(''); } }}
                      >
                        <option value="" >~~Pilih Kategori~~</option>
                        {
                        datumCategory?.length>0?datumCategory.map((item:iCategory,i:number)=>{
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
            {/* End of Edit Project grid */}
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

export default ModalProject;
