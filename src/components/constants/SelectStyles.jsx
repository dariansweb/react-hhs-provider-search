// src/constants/SelectStyles.js
import React from 'react';
import { components } from 'react-select';

// Checkbox Option Component
export const CheckboxOption = props => {
  return (
    <div>
      <components.Option {...props}>
        <input
          type="checkbox"
          checked={props.isSelected}
          onChange={() => null}
        />
        <label>{props.label}</label>
      </components.Option>
    </div>
  );
};

// Multi Value Container Component
export const MultiValueContainer = props => {
  const { selectProps, hasValue } = props;
  const selectedCount = selectProps.value ? selectProps.value.length : 0;

  return (
    <components.ValueContainer {...props}>
      {hasValue ? `${selectedCount} selected` : props.children}
    </components.ValueContainer>
  );
};

// Custom styles for react-select
export const customStyles = {
  control: (base) => ({
    ...base,
    backgroundColor: '#f9f9f9',
    borderColor: '#ddd',
    boxShadow: 'none',
    '&:hover': {
      borderColor: '#999'
    }
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected ? '#e6f3ff' : 'white',
    color: '#333',
    '&:hover': {
      backgroundColor: '#f0f0f0'
    }
  }),
  multiValue: (base) => ({
    ...base,
    backgroundColor: '#e6f3ff'
  }),
  multiValueLabel: (base) => ({
    ...base,
    color: '#333'
  }),
  multiValueRemove: (base) => ({
    ...base,
    color: '#666',
    '&:hover': {
      backgroundColor: '#d3e5f5',
      color: '#333'
    }
  })
};
