import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import "../../css/Animals.css";

const Animals = () => {
  // Get animal data once
  useEffect(() => {
    getAnimals();
  }, []);

  const [animalData, setAnimalData] = useState([]);

  // Get animal data from finalAnimalData.json file and store it in animalData react hook state
  const getAnimals = async () => {
    try {
      const res = await axios.get("finalAnimalData.json");
      setAnimalData(res.data.animals);
    } catch (err) {
      console.log(err);
    }
  };

  //Display animal data gathered from animalData react hook state in a tabular format
  return (
    <Table striped bordered hover size={"sm"}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Images</th>
        </tr>
      </thead>
      <tbody>
        {/*Map animal data into table*/}
        {animalData.map((animal, id) => (
          <tr key={id}>
            <td>
              <a href={animal.link}>{animal.title}</a>
            </td>
            <td>
              <img src={animal.image} alt="Animal image" />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default Animals;
