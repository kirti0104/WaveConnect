import React from 'react'
import Cookies from 'js-cookie';
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useDispatch } from 'react-redux';

interface FormValues{
   photoUrl:  File | null,
    message: string,
}
 const initialValues:FormValues= {
     photoUrl:null,
     message:"",
  };

const CreateWaves = () => {
  const dispatch=useDispatch();
  const userId=Cookies.get('userId');
 
  const validationSchema = Yup.object({
   photoUrl: Yup.mixed().required('Please upload a photo'),
    message: Yup.string().required('Message is required'),
  
  });

  const mutation=useMutation({
    mutationFn:async(formData:FormValues)=>{
      console.log("Payload Sent:", formData);
      const response=await axios.post(`http://localhost:8004/app/inviteFriend/${userId}`,formData)
      return response.data;
    },
    onSuccess:(values:FormValues)=>{
      console.log('form submitted successfully')
      dispatch(setFormValues(values))
      
    },
     onError: (error) => {
      console.error('Error submitting form:', error);
    },

  })
    const handleSubmit = (values: FormValues) => {
    console.log('Form Data:', values);
    const formData = new FormData();
    if (values.photoUrl) {
      formData.append('photoUrl', values.photoUrl);
    }
    formData.append('message', values.message);

    mutation.mutate(formData);
    // Add your submission logic here
  };

  return (
    <div className='createWaves'>
       <div className='heading flex '>
             <img src='/backArrow.png' className='h-8 w-10'/>
             <h2 className='text-2xl text-left mb-5 '>Create Waves</h2>
        </div>
         <div className="mt-0 border-b bg-white rounded-[10px]  shadow-lg">

        <div className="profile-rectangle bg-[#C5B084] w-[1190px] h-[154px] rounded-[10px] relative">
          <div className="absolute -bottom-8 right-[75%] transform -translate-x-1/2">
            <img src="/profileImage.jpg" alt="Profile"className="w-40 h-40 rounded-full border-2 border-white" />
          </div>
        </div>
        <div className='mt-8 ms-8 text-[#3C3D3E]'><h4>What do you want to share?</h4></div>
            <Formik  initialValues={initialValues}  validationSchema={validationSchema} onSubmit={handleSubmit} >
          {({ isSubmitting }) => (
            <Form>
              <div className="mt-4 px-8">
                {/* Upload Photo Input */}
                <Field
                  name="photoUrl"
                  placeholder="Upload Photos"
                  className="w-full h-12 px-4 border border-gray-300 rounded-md focus:outline-none"
                />
                <ErrorMessage
                  name="photo"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />

                {/* Message Input */}
                <Field
                  as="textarea"
                  name="message"
                  placeholder="Write your message..."
                  className="w-full mt-4 h-32 px-4 py-2 border border-gray-300 rounded-md resize-none"
                />
                <ErrorMessage
                  name="message"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-40 h-13 px-6 py-2 ms-8 mt-5 text-white text-xl bg-[#3E5677] hover:bg-[#2E4155] rounded-md text-sm"
                >
                  {isSubmitting ? 'Creating...' : 'Create Wave'}
                </button>
              </div>
            </Form>
          )}
        </Formik>

         <input type="text"  placeholder="Search" className=" mt-4 ms-6 w-[1150px] h-[50px] rounded-full border border-gray-400 bg-gray-100
               text-gray-800 placeholder-gray-600 outline-none px-4 text-sm
               focus:ring-2 focus:ring-gray-300 transition-all" />
        </div>
        
    </div>
  )
}

export default CreateWaves;
