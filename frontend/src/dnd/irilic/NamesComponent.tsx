import React, { useState } from 'react';
import "./names.css";

type Gender = "boy" | "girl" | "boygirl";
type FirstNames = { gender: Gender, name: string }[]
const firstNames: FirstNames = require("./firstNames.json");

type LastNames = string[]
const lastNames: LastNames = require("./lastNames.json");

interface NamesComponentProps {

}

export const NamesComponent = ({ }: NamesComponentProps) => {
    const [firstName, setFirstName] = useState("???")
    const [lastName, setLastName] = useState("???")

    const generateName = (gender: Gender) => () => {
        const genderedNames = firstNames.filter(name => name.gender.includes(gender));
        const firstNameIndex = Math.floor(Math.random() * Math.floor(genderedNames.length));
        const firstName = genderedNames[firstNameIndex]
        setFirstName(firstName.name);

        const lastNameIndex = Math.floor(Math.random() * Math.floor(lastNames.length));
        setLastName(lastNames[lastNameIndex]);
    }

    return (
        <div className="irilic-names-component">
            <div className="irilic-names-container">
                <span>{firstName} {lastName}</span>
            </div>

            <div className="irlic-names-action-container">
                <button onClick={generateName("boy")}>Male</button>
                <button onClick={generateName("girl")}>Female</button>
            </div>
        </div>
    );
}