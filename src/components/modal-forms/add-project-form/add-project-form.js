import React from 'react';
import { Button, Form } from 'react-bootstrap';
import Select from 'react-select';

import './add-project-form.scss';

const options = [
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4', label: '4' },
  { value: '5', label: '5' },
];

const color = '#ffffff';
const backgroundColor = '#0d6efd';
// const backgroundColor = '#01bd07';
// const crosHover = '#0386ce';
// const crosHover = '#077cbd';
const crosHover = '#01bd07';

const colourStyles = {
  // dropdownIndicator: styles => ({
  //   ...styles,
  //   color: '#000000',
  // }),
  multiValue: styles => ({
    ...styles,
    backgroundColor: backgroundColor,
  }),
  multiValueLabel: styles => ({
    ...styles,
    color: color,
  }),
  multiValueRemove: styles => ({
    ...styles,
    color: color,
    ':hover': {
      backgroundColor: crosHover,
      color: color,
    },
  }),
};

const AddProjectForm = () => {
  // const [field, setField] = useState([]);
  // console.log(field);

  return (
    <div className="add-project-form">
      <Form.Group className="mb-3" controlId="titles">
        <Form.Label>Project title</Form.Label>
        <div className="inline-input">
          <Form.Control type="text" placeholder="Enter english title" />
          <Form.Control type="text" placeholder="Enter ukraine title" />
        </div>
        {/* <Form.Text className="text-muted">
          We&apos;ll never share your email with anyone else.
        </Form.Text> */}
      </Form.Group>

      <Form.Group className="mb-3" controlId="formFile">
        <Form.Label>Project image</Form.Label>
        <Form.Control type="file" accept="image/*" />
      </Form.Group>
      {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group> */}

      <Form.Group className="mb-3" controlId="formFile">
        <Form.Label>Select react tags</Form.Label>
        <Select
          closeMenuOnSelect={false}
          // onChange
          // defaultValue={[colourOptions[4], colourOptions[5]]}
          styles={colourStyles}
          isMulti
          options={options}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </div>
  );
};

export default AddProjectForm;
