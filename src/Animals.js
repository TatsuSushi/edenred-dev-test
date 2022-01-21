import React, {useState, useEffect} from 'react';
import axios from "axios";
import Table from 'react-bootstrap/Table';

// !!!!!TODO!!!!
//     1) present data properly
//     2) try to get image data into the same json file, otherwise make seperate json

const Animals = () => {

    useEffect(()=>{
        getAnimals();
    },[]);

    const [animalData, setAnimalData] = useState([]);
    const [imageData, setImageData] = useState([]);

    const getAnimals = async () => {

            try {
                const res = await axios.get('post.json');
                setImageData(res.data.images);
                setAnimalData(res.data.animals);
            } catch (err){
                console.log(err);
            }
        //
        // try {
        //     const res = await axios.get('image.json');
        //     setImages(res.data.animals);
        // } catch (err){
        //     console.log(err);
        // }

    };

    return(
        <Table striped bordered hover size={"sm"}>
            <thead>
            <tr>
                <th>Name</th>
                <th>Images</th>
            </tr>
            </thead>
            <tbody>
        {animalData.map((animal, id) => (

            <tr key={id}>
                <td>
                    <a href={animal.link}>
                        {animal.title}
                    </a>
                </td>
                <td>
                    <img src={animal.image} alt="Animal image"/>

                </td>
            </tr>
        ))}

        {/*/!*This works*!/*/}
        {/*{imageData.map((image, id) => (*/}

        {/*        <td key={id}>*/}
        {/*            <img src={image.image} alt="Animal image"/>*/}
        {/*        </td>*/}
        {/*))}*/}

            </tbody>
        </Table>
    );
};

export default Animals;
