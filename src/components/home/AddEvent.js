import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import ApiService from '../../services/Neo4jAPIService'
import {
  Formik,
  ErrorMessage,
} from 'formik'
import * as Yup from 'yup'

const required = 'Ce champ est requis'

let schema = Yup.object().shape({
  title: Yup.string()
    .min(3, 'Le titre est trop court')
    .max(200, 'Le titre est trop long')
    .required(required),
  content: Yup.string()
    .max(300, 'La description est trop longue')
    .required(required),
  date: Yup.string()
    .required(required),
  link: Yup.string()
    .max(200, 'Le lien est trop long')
})

export default class AddEvent extends Component {

  constructor(props) {
    super(props);
    this.initialValues = {
      title: '',
      content: '',
      date: (new Date()).toLocaleDateString(),
      link: ''
    }
    this.eventAdded = this.props.eventAdded;
  }

  async onSubmit(values) {
    const event = {
      ...values
    }
    ApiService.createEvent(event)
      .then(() => {
        this.eventAdded()
      })
      .catch(err => {
        console.error(err)
      })
  }

  

  render() {
    return (
      <Formik
        initialValues={this.initialValues}
        validationSchema={schema}
        onSubmit={values => {
          this.onSubmit(values)
        }}
      >
        {({
          handleSubmit,
          handleChange,
          values,
          handleReset,
          errors,
          touched
        }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Form.Group controlId="title">
                <Form.Label>Titre</Form.Label>
                <Form.Control
                  type="text"
                  value={values.title}
                  onChange={handleChange}
                  isInvalid={!!errors.title && touched.title}
                  placeholder="Titre de l'évènement" />
                <Form.Control.Feedback type="invalid">
                  <ErrorMessage name='title' />
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="content">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="Exprimez vous!"
                  rows="3"
                  value={values.content}
                  onChange={handleChange}
                  isInvalid={!!errors.content && touched.content}
                />
                <Form.Control.Feedback type="invalid">
                  <ErrorMessage name='content' />
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="link">
                <Form.Label>Lien</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Lien de l'évènement"
                  value={values.link}
                  onChange={handleChange}
                  isInvalid={!!errors.link && touched.link} />
                <Form.Control.Feedback type="invalid">
                  <ErrorMessage name='link' />
                </Form.Control.Feedback>
              </Form.Group>

              <Button variant="primary" onClick={handleReset} type="submit">
                Créer évènement
              </Button>
            </Form>
          )}
      </Formik>



    );
  }
}

