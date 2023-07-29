import { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

import { IFormInput } from '@/types';

import contactImg from '@/assets/contact-img.svg';

const Contact = () => {
    const formInitialDetails = {
        fullName: '',
        email: '',
        message: '',
    };

    const { t } = useTranslation();

    const [formDetails, setFormDetails] = useState(formInitialDetails);
    const [buttonText, setButtonText] = useState('Send');

    const { register, formState: { errors }, handleSubmit, } = useForm<IFormInput>();


    const onFormUpdate = (category: any, value: any) => {
        setFormDetails({
            ...formDetails,
            [category]: value,
        });
    };
    


    const handleTypeSubmit = async () => {
        setButtonText('Sending...');
        
        let response = await fetch(import.meta.env.VITE_REACT_BASE_URL, {
            method: "POST",
            headers: {
                'Content-Type': 'Application/json;charset=utf-8',
            },
            body: JSON.stringify(formDetails),
        });
        setButtonText('Send');

        let result = await response.json();
        setFormDetails(formInitialDetails);

        if (result.code === 200) {
            toast(t('MesssageOk'), {
                position: 'bottom-left',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined
            })

        } else {
            toast.error(t('MessageError'), {
                position: 'bottom-left',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined
            })
        }
    };

    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            variants={{
                hidden: { opacity: 0, x: 100 },
                visible: { opacity: 1, x: 0 }
            }}
            className='max-w-7xl mx-auto mt-8 w-full'>
            <div className='flex flex-row justify-between items-start mt-3 w-full sm:gap-5'>
                <img className='w-1/3' src={contactImg} alt="" />
                <div className="sm:w-full">
                    <form onSubmit={handleSubmit(handleTypeSubmit)} className='flex flex-col items-end w-full h-full'>

                        <div className='inputs flex flex-col gap-2 w-full'>
                            <input
                                type="text"
                                value={formDetails.fullName}
                                {...register('fullName',
                                    {
                                        required: "This input is required",
                                        maxLength: 99,
                                    }
                                )}
                                placeholder={t('Form_name')}
                                onChange={e => onFormUpdate('fullName', e.target.value)}
                                className='w-full outline-none rounded-md placeholder:text-gray text-white bg-gray-700 p-2'
                            />
                            {errors.fullName?.type === 'required' && (
                                <p className='text-chilli_red' role='alert'>Name is required</p>
                            )}

                            <input
                                type="email"
                                value={formDetails.email}
                                {...register('email', {
                                    required: "This input is required",
                                    minLength: 7,
                                })}
                                placeholder={t('Form_email')}
                                onChange={e => onFormUpdate('email', e.target.value)}
                                className='w-full outline-none rounded-md placeholder:text-gray text-white bg-gray-700 p-2'
                            />
                            {errors.email?.type === 'required' && (
                                <p className='text-chilli_red' role='alert'>Email is required</p>
                            )}

                            <textarea
                                rows={3}
                                value={formDetails.message}
                                {...register('message', {
                                    required: "Please enter a message.",
                                    minLength: 3,
                                })}
                                placeholder={t('Form_message')}
                                onChange={e => onFormUpdate('message', e.target.value)}
                                className='w-full resize-none outline-none rounded-md placeholder:text-gray text-white bg-gray-700 p-2 lg:h-[200px]'
                            ></textarea>
                            {errors.message?.type === 'required' && (
                                <p className='text-chilli_red' role='alert'>Message is required</p>
                            )}
                        </div>
                        <button
                            type="submit"
                            className='mt-2 bg-orange border-none bg-timberwolf px-3 py-1 rounded-sm text-night'
                        >
                            <span>{buttonText}</span>
                        </button>
                    </form>
                </div>
                
            </div>
        </motion.div>
    )
}

export default Contact