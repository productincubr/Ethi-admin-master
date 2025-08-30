import React, { useState, useRef } from "react";
import '../Css/GeneralForm.css'
import { CKEditor } from 'ckeditor4-react';
import Select from 'react-select';
import Header from "./Header";

function GeneralForm() {

    // const profiles = ['Developer', 'Software Engineer', 'Analyst', 'React Developer', 'Intern'];
    const profiles = [
        { value: '1', label: 'Developer' },
        { value: '2', label: 'Software Engineer' },
        { value: '3', label: 'Analyst' },
        { value: '4', label: 'React Developer' },
        { value: '5', label: 'Intern' }];


    const [selectedImage, setSelectedImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState('');
    const [editorContent, setEditorContent] = useState('');

    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        pan: "",
        aadhar: "",
        email: "",
        designation: [],
        image: null,
        description: "This is an example CKEditor 4 WYSIWYG editor instance."
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleDesignationChange = (selectedOptions) => {
        const values = selectedOptions.map(option => option.value);
        setFormData((prevData) => ({ ...prevData, designation: values }));
    };

    // const [selectedOptions, setSelectedOptions] = React.useState([]);

    // const handleSelectChange = (selectedOptions) => {
    //     setSelectedOptions(selectedOptions);
    // };

    // const handleSelectChange = (event) => {
    //     const selectedValues = Array.from(event.target.selectedOptions, (option) => option.value);
    //     setSelectedOptions(selectedValues);
    // };

    // const handleChangeSelect = (e) => {
    //     const { name, value } = e.target;
    //     setFormData((prevData) => ({ ...prevData, [name]: value }));
    // };

    // const handleChangeSelect = (e) => {
    //     const { name, options } = e.target;
    //     const selectedOptions = Array.from(options)
    //         .filter((option) => option.selected)
    //         .map((option) => option.value);

    //     setFormData((prevData) => ({ ...prevData, [name]: selectedOptions }));
    // };

    // handle image selection
    const handleImageSelect = (event) => {
        event.preventDefault();
        const file = event.target.files[0];
        setFormData((prevData) => ({ ...prevData, image: file }));
        setSelectedImage(file);
        console.log(selectedImage);

        // preview the image
        const reader = new FileReader();
        reader.onload = () => {
            setPreviewUrl(reader.result);
        };
        reader.readAsDataURL(file);

    };

    const imageInputRef = useRef(null);
    const resetFileInput = () => {
        imageInputRef.current.type = '';
        setPreviewUrl('');
        setFormData((prevData) => ({ ...prevData, image: null }));
        setSelectedImage(null);
    }

    const handleEditorChange = (event) => {
        const editorData = event.editor.getData();
        setEditorContent(editorData);
        setFormData((prevData) => ({ ...prevData, description: editorData }));
        console.log(editorData)
    };

    const [errors, setErrors] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();

        const formErrors = {};
        if (!formData.name) {
            formErrors.name = 'Name is required';
        }

        if (!formData.image) {
            formErrors.image = 'Image is required';
        }

        if (!formData.email) {
            formErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            formErrors.email = 'Invalid email address';
        }

        if (!formData.phone) {
            formErrors.phone = 'Phone Number is required';
        } else if (!/^\d{10}$/.test(formData.phone)) {
            formErrors.phone = 'Invalid Phone Number';
        }

        if (!formData.pan) {
            formErrors.pan = 'PAN Number is required';
        } else if (!/^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}$/.test(formData.pan)) {
            formErrors.pan = 'Invalid PAN Number';
        }

        if (!formData.aadhar) {
            formErrors.aadhar = 'Aadhar Number is required';
        } else if (!/^\d{12}$/.test(formData.aadhar)) {
            formErrors.aadhar = 'Invalid PAN Number';
        }


        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
        } else {


            // Save form data to session storage
            sessionStorage.setItem("formData", JSON.stringify(formData));
            console.log(formData);

            // Reset form fields
            setFormData({
                name: "",
                phone: "",
                pan: "",
                aadhar: "",
                email: "",
                designation: [],
                image: null,
            });

            setEditorContent('');
            document.getElementById("input_image").value = null;
            resetFileInput();
        }
    };

    return (
        <div className='form'>
            <div className="container">
                <Header />
            </div>
            <div className="form_container container d-flex justify-content-center align-items-center p-3">
                <div className="form_wrapper col-xl-9 col-sm-10 d-flex justify-content-center shadow mt-4 px-3 py-4 pt-5">
                    <div className="form_div">
                        <form>
                            <div className="row justify-content-around">
                                <div className="col-md-5 col-sm-11 col-11 name">
                                    <label>Name</label>
                                    <br />
                                    <input name="name" id="name" value={formData.name} type="text" placeholder="NAME" onChange={handleChange} />
                                    <div className="error_msg">{errors.name && <span>{errors.name}</span>}</div>
                                </div>
                                <div className="col-md-5 col-sm-11 col-11 phone">
                                    <label>Phone</label>
                                    <br />
                                    <input name="phone" id="phone" value={formData.phone} type="number" placeholder="PHONE NUMBER" onChange={handleChange} />
                                    <div className="error_msg">{errors.phone && <span>{errors.phone}</span>}</div>
                                </div>
                            </div>
                            <br />
                            <div className="row justify-content-around">
                                <div className="col-md-5 col-sm-11 col-11 pan">
                                    <label>Pan</label>
                                    <br />
                                    <input name="pan" id="pan" value={formData.pan} className="" type="text" placeholder="PAN NUMBER" onChange={handleChange} />
                                    <div className="error_msg">{errors.pan && <span>{errors.pan}</span>}</div>
                                </div>
                                <div className="col-md-5 col-sm-11 col-11 aadhar">
                                    <label>Aadhar</label>
                                    <br />
                                    <input name="aadhar" id="aadhar" value={formData.aadhar} type="text" placeholder="AADHAR NUMBER" onChange={handleChange} />
                                    <div className="error_msg">{errors.aadhar && <span>{errors.aadhar}</span>}</div>
                                </div>
                            </div>
                            <br />
                            <div className="row justify-content-around">
                                <div className="col-md-5 col-sm-11 col-11 email">
                                    <label>Email</label>
                                    <br />
                                    <input name="email" id="email" value={formData.email} type="email" placeholder="EMAIL" onChange={handleChange} />
                                    <div className="error_msg">{errors.email && <span>{errors.email}</span>}</div>
                                </div>
                                <div className="col-md-5 col-sm-11 col-11 designation">
                                    <label>Designation</label>
                                    <br />
                                    <Select
                                        name="designation"
                                        options={profiles}
                                        isMulti
                                        value={profiles.filter(option => formData.designation.includes(option.value))}
                                        onChange={handleDesignationChange}
                                    />
                                    {/* <select name='designation' value={formData.designation} onChange={handleChangeSelect}>
                                                    <option value={''}>Select Post</option>
                                                    {profiles.map((item, index) => (
                                                        <option key={index} value={item.id}>{item.name}</option>
                                                    ))}
                                                </select> */}
                                </div>
                            </div>
                            <br />
                            <div className="col-sm-11 m-auto img_upload_div py-3 rounded">
                                <div className="img_upload">
                                    <div className="label_input_div col-lg-7 col-md-8 col-sm-11">
                                        <label htmlFor="input_image">Upload Image:</label>
                                        <input hidden name="image" id="input_image" type="file" accept="image/*" onChange={handleImageSelect} />
                                        <span><label className="btn btn-light upload_btn" htmlFor='input_image'>Upload</label></span>
                                        <div className="error_msg">&nbsp;&nbsp;{errors.image && <span>{errors.image}</span>}</div>
                                    </div>
                                    <br />
                                    <div className="col-md-6 col-sm-11 m-auto d-flex justify-content-center">
                                        {previewUrl && (
                                            <img src={previewUrl} ref={imageInputRef} alt="Preview" style={{ width: '250px' }} />
                                        )}
                                    </div>
                                </div>
                            </div>
                            <br />
                            <div>
                                <div className="col-sm-11 m-auto">
                                    <label>Description</label>
                                    <br />
                                    <CKEditor name="description" data={editorContent} onChange={handleEditorChange} />
                                </div>
                            </div>
                            <br />
                            <div className="col-sm-11 d-flex justify-content-end submit_button">
                                <button className="btn btn-light submit_btn col-2 shadow" onClick={handleSubmit} type="button">SUBMIT</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GeneralForm;