import { Button, CircularProgress, Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import SectionPop from '../../components/Models/SectionPop'
import YearPop from '../../components/Models/YearPop'
import PageTitle from '../../components/PageTitle/PageTitle'
import useStyles from "../SemestersData/styles";
import SendIcon from '@material-ui/icons/Send';
import {
    AddToPhotosRounded as AddToPhotos,
} from "@material-ui/icons";

function Placements() {
    const drop = document.querySelector(".drop");
    const progress = document.querySelector(".progress");
    var classes = useStyles();
    const [section, setSection] = useState(null);
    const [year, setYear] = useState(null);
    const [excelFileData, setExcelFileData] = useState({ preview: '', data: '' })
    const [excelFileName, setExcelFileName] = useState(null);
    const [excelStatus, setExcelStatus] = useState('');
    const [isDisabled, setIsDisabled] = useState(true);
    const handleSectionChange = (e) => {
        setSection(e)
    }
    const handleYearChange = (e) => {
        setYear(e)
    }
    const emptyStates = () => {
        setSection('');
        setYear('');
        setExcelFileData({ preview: '', data: '' });
        setExcelFileName(null);
    }
    useEffect(() => {
        if (excelFileName !== null && excelFileData && section && year) {
            setIsDisabled(false)
        }
    }, [excelFileName, section, year, excelStatus])
    const handleExcelSubmit = async (e) => {
        setExcelStatus(null)
        e.preventDefault()
        let formData = new FormData()
        formData.append('file', excelFileData.data)
        formData.append('section', section)
        formData.append('year', year)
        formData.append('isPrev', section + year)
        const response = await fetch('http://localhost:3001/placements', {
            method: 'POST',
            body: formData,
        })
        if (response) {
            setExcelStatus(response.excelStatusText);
            emptyStates()
            window.location.reload(false)
        }
    }
    const handleExcelFileChange = (e) => {
        drop.style.display = "none";
        excelupload()
        const fileInfo = {
            preview: URL.createObjectURL(e.target.files[0]),
            data: e.target.files[0],
        }
        setExcelFileName(e.target.files[0].name)
        setExcelFileData(fileInfo)
    }

    function excelupload() {
        // fake Upload Logic
        let intervalCount = 0.25;
        progress.style.display = "block";
        progress.style.width = `${20 * intervalCount}%`;
        const interval = setInterval(() => {
            intervalCount += 0.25;
            progress.style.width = `${20 * intervalCount}%`;
            if (intervalCount === 5) {
                clearInterval(interval);
                progress.style.display = "none";
                drop.style.display = "block";
            }
        }, 100);
    }
    return (
        <>
            <PageTitle title="" button={(<> <SectionPop onSectionChange={handleSectionChange} /> <YearPop onYearChange={handleYearChange} /> </>)} />
            <Grid container spacing={10}>
                <Grid item xs={12} md={12} className={section && year ? null : 'disabledcursor'}>
                    <PageTitle title="Upload Student Excel Sheet" />
                    <div className="drop-container">
                        <div className="drop">
                            {excelStatus === null ? <CircularProgress size={50} className={classes.loginLoader} /> : (
                                excelFileName ? excelFileName :
                                    <>
                                        <AddToPhotos />
                                        <span className="text">
                                            Upload Students Details Through Excel Sheet
                                        </span>
                                        <label htmlFor="file-upload">Browse Files</label>
                                        <input type="file" id="file-upload" className="file-input" accept='.xlsx, .xls, .csv' onChange={handleExcelFileChange} disabled={section && year ? false : true} />
                                    </>)}
                        </div>
                        <div className="progress"></div>
                        <Button disabled={isDisabled} variant="contained" onClick={handleExcelSubmit} style={{ backgroundColor: !isDisabled ? '#7B1FA2' : '#eeeeee', color: '#FFFFFF', marginTop: 29 }} endIcon={<SendIcon />}>
                            Submit
                        </Button>
                    </div>
                </Grid>
            </Grid>
        </>
    )
}

export default Placements