import React from 'react';

class Item extends React.Component {
    render() {
      const { item } = this.props;
      return (
        <div style={{ padding: `12px` }} id={item}>
          Item {item}
        </div>
      );
    }
  }
  
  class List extends React.Component {
    state = {
      items: [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20
      ]
    };
  
    handleScroll = event => {
      console.log(event);
    };
  
    onClick = () => {
      /** You can avoid using getElementById if you can get the div rendered by Item component using refs.
       * You can look at refs forwarding and other technics to see how you can solve this */
      const divToScrollTo = document.getElementById(`${this.ref_20.props.item}`);
      if (divToScrollTo) {
        divToScrollTo.scrollIntoView();
      }
    };
  
    render() {
      const { items } = this.state;
      return (
        <div>
          <h1>My List</h1>
          <button onClick={this.onClick}>Clickidy</button>
          {/*Replace with <div> to see it work*/}
          <div
            style={{
              height: `200px`,
              overflow: "scroll",
              backgroundColor: "red"
            }}
          >
            {this.state.items.map(item => (
              <Item ref={inst => (this[`ref_${item}`] = inst)} item={item} />
            ))}
          </div>
        </div>
      );
    }
  }

export default List;