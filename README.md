# en
## words.json
Contains a list of all (or at least the vast vast majority) of words in the English Language and some others which may not be considered exactly words but are still used in writing. In the form of a list of strings, sorted in alphabetical order then by length.
```
["a", "aa", "aaa", "aah", ... "zwinglianist", "zwitter", "zwitterion", "zwitterionic"]
```

## bk.json
Contains a BK tree of the words. Each node is in the form : 
```
{
  value : [string]
  connections : [dictionary<int,obj>]
}
```
The `value` is the word itself, and `connections` is a dictionary with a key of integers, and a value of object. The integer key is the length of the arc, and the object value is a reference to the connected node. Since BK trees only have one edge of any given length, a dictionary is used to prevent duplicates.
The root node of this BK tree is `"a"`.

## tree.json
Contains all of the words in a tree where each node is a boolean value and each arc is a letter. By going down the tree by choosing arcs, you create a word, and whether that is a valid word is the node value.
Each node is in the form : 
```
{
  word : [bool]
  children : [object]
}
```
For example, the words `aa` and `ab` would be stored in this tree : 
```
{
  word : false,  //the empty string is not a word
  children : {
    a : {
      word : false,  //"a" is not a word
      children : {
        a : {word : true, children : {}},  //"aa" is a word
        b : {word : true, children : {}}   //"ab" is a word
      }
    }
  }
}
```
