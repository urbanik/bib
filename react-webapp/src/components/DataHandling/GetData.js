import React, { Component } from 'react';
import './style.css';

const bib = require('./bib.json');
const maitre = require('./maitre.json');

class GetData extends Component {
    constructor(props){
        super(props);
    }

    render() {

        return(
            <div>
                <div id="div1">
                    <table>
                        <tr>
                            <th>Bib restaurants</th>
                        </tr>
                        {
                            bib.map(bib => (
                                <tr>
                                    <td>
                                        {bib.name}
                                    </td>
                                </tr>
                            ))
                        }
                    </table>
                </div>
                <div id="div2">
                    <table>
                        <tr>
                            <th>Maitre restaurants</th>
                        </tr>
                        {
                            maitre.map(maitre => (
                                <tr>
                                    <td>
                                        {maitre.name}
                                    </td>
                                </tr>
                            ))
                        }
                    </table>
                </div>
            </div>
        );
    }
}

export default GetData;