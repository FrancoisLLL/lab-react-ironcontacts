import contacts from "./contacts.json";
import React, { Component } from 'react'

import './App.css';

function App() {
  return (
    <>
      <h1>Ironcarts</h1>
      <div className="App">
        <ContactsTable />
      </div>
    </>
  );
}

class ContactsTable extends Component {

  state = {
    contacts: contacts.filter((item, index) => index < 5 ? item : false),
  }

  addRandom = () => {
    const newArray = contacts.filter(item => {
      return !this.state.contacts.includes(item)
    })

    console.log("Filtered Array", newArray);
    console.log("List", this.state.contacts)

    if (newArray.length > 0) {
      let index = Math.floor(Math.random() * (newArray.length))
      let item = newArray[index]

      console.log(index, item)

      this.setState({
        contacts: [...this.state.contacts, item]
      })
    }
  }

  sortList = (sort) => {

    const copy = [...this.state.contacts];

    console.log(sort)

    if (sort === "name") {
      console.log("in name sort")
      copy.sort((a, b) => {
        return a.name.localeCompare(b.name);
      })
    }

    else {
      console.log("in pop sort")
      copy.sort((a, b) => {
        return a.popularity - b.popularity;
      })
    }


    this.setState({
      contacts: copy,
    });
  };

  removeItem = (id) => {
    const newArray = this.state.contacts.filter(item => item.id !== id)

    this.setState({
      contacts: newArray
    })
  }

  render() {
    // console.log(this.state)
    return (
      <>
        <div className="ContactsTable-buttonsList">
          <button className="ContactsTable-buttons" onClick={this.addRandom}>Add Random</button>
          <button className="ContactsTable-buttons" onClick={() => { this.sortList("name") }}>Sort by name</button>
          <button className="ContactsTable-buttons" onClick={() => { this.sortList("popularity") }}>Sort by popularity</button>
        </div>
        <table className="ContactsTable">
          <thead>
            <tr>
              <td>Picture</td>
              <td>Name</td>
              <td>Popularity</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>
            {this.state.contacts.map(item => {
              return (
                <tr key={item.id}>
                  <td>
                    <img className="ContactsTable-img" src={item.pictureUrl} alt=""></img>
                  </td>
                  <td>{item.name}</td>
                  <td>{item.popularity}</td>
                  <td>
                    <button onClick={() => { this.removeItem(item.id) }}>Remove</button>
                  </td>
                </tr>
              )
            }
            )}
          </tbody>
        </table>
      </>
    )
  }
}



//Iteration 1
// export const ContactsTable = () => {
//   const newArray = contacts.slice(0, 5);

//   console.log(newArray);

//   return (
//     <table>
//       <tr>
//         <th>Picture</th>
//         <th>Name</th>
//         <th>Popularity</th>
//       </tr>

//       {newArray.map(item => {
//         return (
//           <tr>
//             <th>
//               <img className = "ContactsTable-img" src={item.pictureUrl} alt=""></img>
//             </th>
//             <th>{item.name}</th>
//             <th>{item.popularity}</th>
//           </tr>
//         )
//       }
//       )}
//     </table>
//   )
// }





export default App;
