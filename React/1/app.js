// const heading = React.createElement(
//     "h1",
//     {id:"heading" ,xyz:"kuch" },
//     "Hello Duniya Again but This time By React!!!");
const parent = React.createElement(
    "div",
    { id: "parent" },
    [
        React.createElement("div",{ id: "child1" },
           [React.createElement("h1", {}, "Hey I am Parent's First Child1 H1"),
           React.createElement("h2", {}, "Hey I am Parent's Second Child1 H2")]),

        React.createElement("div",{ id: "child2" },
           [React.createElement("h3", {}, "Hey I am Parent's First Child2 H3" ),
            React.createElement( "h4", {}, "Hey I am Parent's Second Child2 H4")])
    ]
)
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(parent);
