import React, { useState,useEffect } from 'react';
import { Modal, ModalBody, ModalFooter, Button } from '@windmill/react-ui';
import Api from 'lib/httpService';
import Helper from 'lib/helper';
import { handlePut, handlePost } from 'lib/handleAction';
// import { useRouter } from 'next/router'
import { useToasts } from 'react-toast-notifications'
// import Sess from "lib/auth";


interface iModalCategory {
  open: boolean;
  closeModal: () => void;
  data: any;
}
const ModalCategory: React.FC<iModalCategory> = ({ open, closeModal, data }) => {
  const { addToast } = useToasts();
  const [ftitle,setFtitle]=useState("");
  const [ftype,setFtype]=useState("0");
  // const router = useRouter()

  useEffect(()=>{
    if(data.id!==undefined){
      setFtitle(data.title)
      setFtype(data.type)
    }
  },[])

  const toggleModal = () => {
    closeModal();
  };

  const handleSubmit= async () => {
    let datum: any = {};
    if(ftitle===""){
      addToast("Title tidak boleh kosong.", {
          appearance: 'error',
          autoDismiss: true,
      })
    } else if(ftype===""){
      addToast("Type tidak boleh kosong.", {
          appearance: 'error',
          autoDismiss: true,
      })
    } else {
      Object.assign(datum, {'title': ftitle,'type': ftype})
    }
    
    if(Helper.isEmptyObj(datum)){
      console.log(datum);
      addToast("Tidak ada perubahan.", {
          appearance: 'error',
          autoDismiss: true,
      })

    }else{
      if(data.id!==undefined){
        await handlePut(Api.apiClient + `category/${data.id}`, datum, async (datum) => {
          addToast(datum.msg, {
              appearance: 'success',
              autoDismiss: true,
          })
          closeModal();
        });
      } else {
        await handlePost(Api.apiClient + `category`, datum, async (datum) => {
          addToast(datum.msg, {
              appearance: 'success',
              autoDismiss: true,
          })
          closeModal();
        });
      }
    }
  };

  return (
    <Modal isOpen={open} onClose={toggleModal}>
      <form>
        <ModalBody>
          <div className="w-full items-center justify-items-center p-0">
            {/* Edit Category */}
            <div className="bg-white dark:bg-gray-800 p-3 shadow-lg rounded-lg">
              <div className="flex items-center space-x-2 font-semibold text-gray-900 dark:text-gray-200 leading-8 mb-3">
                <span className="tracking-wide">{data.id!==undefined?"Edit":""} Category</span>
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
                    <span className="text-gray-700 dark:text-gray-400">Type</span>
                      <select 
                          className="block w-full mt-1 px-4 py-3 text-sm dark:border-gray-600 dark:bg-gray-700 focus:outline-none  dark:text-gray-300 div-input" 
                          value={ftype}
                          onChange={(event) => {
                              event.preventDefault();
                              setFtype(event.target.value);
                          }}
                          // onKeyPress={event => { if (event.key === 'Enter') { handleSearch(''); } }}
                      >
                          <option value="0">NOL</option>
                          <option value="1">SATU</option>
                      </select>
                  </label>
              </div>
            </div>
            {/* End of Edit Category grid */}
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

export default ModalCategory;
