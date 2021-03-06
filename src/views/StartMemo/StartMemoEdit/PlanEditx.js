import React, { useState, useEffect } from "react";
import ReactMultiSelectCheckboxes from "react-multiselect-checkboxes";

// import options from "./data";
import Options from 'data/options.json';

const options = Options.Options;
const PlanEditx = () => {
    const [selectedOptions, setSelectedOptions] = useState([]);

    useEffect(() => {
        setSelectedOptions([{ label: "All", value: "*" }, ...options]);
    }, []);

    function getDropdownButtonLabel({ placeholderButtonLabel, value }) {
        if (value && value.some((o) => o.value === "*")) {
            return `${placeholderButtonLabel}: All`;
        } else {
            return `${placeholderButtonLabel}: ${value.length} selected`;
        }
    }

    function onChange(value, event) {
        if (event.action === "select-option" && event.option.value === "*") {
            this.setState(this.options);
        } else if (
            event.action === "deselect-option" &&
            event.option.value === "*"
        ) {
            this.setState([]);
        } else if (event.action === "deselect-option") {
            this.setState(value.filter((o) => o.value !== "*"));
        } else if (value.length === this.options.length - 1) {
            this.setState(this.options);
        } else {
            this.setState(value);
        }
    }

    return ( <
        ReactMultiSelectCheckboxes options = {
            [{ label: "All", value: "*" }, ...options] }
        placeholderButtonLabel = "Colors"
        getDropdownButtonLabel = { getDropdownButtonLabel }
        value = { selectedOptions }
        onChange = { onChange }
        setState = { setSelectedOptions }
        />
    );
};

export default PlanEditx;