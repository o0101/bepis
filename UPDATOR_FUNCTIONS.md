# Notes


In order to update a node, we need a few pieces of information:

- the node we want to update
- the part of the node we want to update
- what the old value was (to see if we need to update, or to undo before adding the new value)
- the new value

We can get the node in the first time we call treeToDOM

We can get the part of the node in buildTree, since it's obvious from the parse and the slot what the part is.

It can be:

- Element
- String
- Attributes object
- Style object
- null / empty 

We can get what the old value was from the first time we call buildTree, and then save whenever we update it.

We get the new value when it's passed in.

# Implementation

This information can be put into an updator function.

The function can be created at parse time, and saved in the tree.

Each updator function handles 1 slot. We also return the updator functions in a list, where each position corresponds to the slot it updates. 

The updator function is easily found for any slots that change.



