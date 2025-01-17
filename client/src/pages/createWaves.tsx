import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { useDispatch } from 'react-redux';
import { setFormValues } from '../redux/wavesSlice';

interface FormValues {
  photoUrl: File | null;
  message: string;
}

const initialValues: FormValues = {
  photoUrl: null,
  message: "",
};

const CreateWaves = () => {
  const dispatch = useDispatch();
  const userId = Cookies.get('userId');
  
  const [photoUrl, setPhotoUrl] = useState<File | null>(null); 

  const validationSchema = Yup.object({
    photoUrl: Yup.mixed().required('Please upload a photo'),
    message: Yup.string().required('Message is required'),
  });

  const getUserDetails = async () => {
    const response = await axios.get(`http://localhost:8004/app/getUser/${userId}`);
    return response.data;
  };

  const { isLoading, isError, data: userDetails } = useQuery({
    queryKey: ["userDetails"],
    queryFn: getUserDetails,
  });

  useEffect(() => {
    if (userDetails) {
      console.log('User Details:', userDetails);
    }
  }, [userDetails]);

  const mutation = useMutation({
    mutationFn: async (formData: FormData) => {
      console.log("Payload Sent:", formData);
      const response = await axios.post(`http://localhost:8004/app/createWaves/${userId}`, formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      )
      return response.data;
    },
    onSuccess: (data) => {
      console.log('Form submitted successfully', data)
      dispatch(setFormValues(data))
      setPhotoUrl(null);
    },
    onError: (error: AxiosError) => {
      console.error('Error submitting form:', error);
      if (error.response) {
        console.error('Response Data:', error.response.data);
        console.error('Response Status:', error.response.status);
      }
    },
  });

  const handleSubmit = (values: FormValues, { resetForm }: FormikHelpers<FormValues>) => {
    console.log('Form Data:', values);
    const formData = new FormData();
    if (photoUrl) {
      formData.append('photoUrl', photoUrl); 
    }
    formData.append('message', values.message);
    formData.append('name', userDetails.firstName);

    mutation.mutate(formData);
    alert('Wave created successfully');
    resetForm();
    setPhotoUrl(null);
  };

  return (
    <div className='createWaves'>
      <div className='heading flex'>
        <img src='/backArrow.png' className='h-8 w-10' />
        <h2 className='text-2xl text-left mb-5 '>Create Waves</h2>
      </div>
      <div className="mt-0 border-b bg-white rounded-[10px] shadow-lg">

        <div className="profile-rectangle bg-[#C5B084] w-[1190px] h-[154px] rounded-[10px] relative">
          <div className="absolute -bottom-8 right-[75%] transform -translate-x-1/2">
            <img src="/profileImage.jpg" alt="Profile" className="w-40 h-40 rounded-full border-2 border-white" />
          </div>
        </div>
        <div className='mt-8 ms-8 text-[#3C3D3E]'><h4>What do you want to share?</h4></div>
        {isLoading && <p>Loading user details...</p>}
        {isError && <p>Error fetching user details. Try again.</p>}
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          {({ isSubmitting, setFieldValue }) => (
            <Form>
              <div className="mt-4 px-8">
                {/* Upload Photo Input */}
                <input
                  name='photoUrl'
                  type='file'
                  accept='image/*'
                  className='w-full h-12 px-4 border border-gray-300 rounded-md focus:outline-none'
                  onChange={(event) => {
                    if (event.target.files) {
                      setFieldValue('photoUrl', event.target.files[0]);
                      setPhotoUrl(event.target.files[0]); // Update the state with the selected file
                    }
                  }}
                />
                <ErrorMessage
                  name="photoUrl"
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

        <input
          type="text"
          placeholder="Search"
          className="mt-4 ms-6 w-[1150px] h-[50px] rounded-full border border-gray-400 bg-gray-100 text-gray-800 placeholder-gray-600 outline-none px-4 text-sm focus:ring-2 focus:ring-gray-300 transition-all"
        />
      </div>
    </div>
  )
}

export default CreateWaves;
