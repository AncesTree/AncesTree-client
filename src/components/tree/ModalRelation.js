import React, {useEffect, useState} from "react";
import {Button, Modal} from "react-bootstrap";
import Neo4jAPIService from "../../services/Neo4jAPIService";
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';


function ModalRelation (props) {
    const [sen, setSen] = useState("");
    const [jun, setJun] = useState("");
    const [senior, setSenior] = useState(undefined);
    const [junior, setJunior] = useState(undefined);
    const [searchSenior, setSearchSenior] = useState([])
    const [searchJunior, setSearchJunior] = useState([])

    const handleChangeSenior = (e) => {
        setSen(e.target.value);
        Neo4jAPIService.searchUsers(sen).then(res => setSearchSenior(res.users))
    };

    const handleChangeJunior = (e) => {
        setJun(e.target.value);
        Neo4jAPIService.searchUsers(jun).then(res => setSearchJunior(res.users))
    };

    const handleClose = () => {
        updateShow(false)
    };

    const selectSenior = (e, value) => {
        e.persist();
        setSenior(value)
    };

    const selectJunior = (e, value) => {
        e.persist();
        setJunior(value)
    };

    const updateShow = (value) => props.updateShow(value);

    const affectSenior = () => {
        if (senior && junior && senior.id !== junior.id){
            props.affectSenior(senior.id, junior.id);
            handleClose();
        }
    };

    return (
        <>
            <Modal show={props.show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Affecter un parrain</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Autocomplete
                        options={searchSenior}
                        getOptionLabel={option => `${option.firstname} ${option.lastname}`}
                        onChange={selectSenior}
                        renderInput={params => (
                            <TextField {...params} label="Parrain" variant="outlined" value={sen} onChange={handleChangeSenior} fullWidth />
                        )}
                    />

                    <Autocomplete
                        options={searchJunior}
                        getOptionLabel={option => `${option.firstname} ${option.lastname}`}
                        onChange={selectJunior}
                        renderInput={params => (
                            <TextField {...params} label="Filleul" variant="outlined" value={jun} onChange={handleChangeJunior} fullWidth />
                        )}
                    />


                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Fermer
                    </Button>
                    <Button variant="primary" onClick={affectSenior}>
                        Affecter
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalRelation;