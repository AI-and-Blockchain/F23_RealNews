pragma solidity ^0.8.0;

contract NewsContract {
    //struct to represent all info we need about each hash
    struct Post {
        uint256 id;
        string claimHash;
        string factCheckHash;
        uint256 upvotes;
        uint256 downvotes;
    }
    address owner;

    //all posts
    mapping (uint256 => Post) public posts;
    Post[] public postArray;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }

    //this is all code for another project I found but we'll do something similar except we need to do stuff with the
    //hashes and IPFS 

    //create a post with its IPFS hash
    function createPost () public onlyOwner {
        
        Product memory product = Product(_id, _name, _price, _quantity);
        products[_id] = product; 
        productArray.push(Product(_id, _name, _price, _quantity));
    }

    //get a post from IPFS, should return the hash
    function getProduct (uint256 _id) public view returns (string memory, uint256, uint256) {
        require(products[_id].id !=0 , "Product is not available");
        Product memory product = products[_id];
        return (product.name, product.price, product.quantity);
    }

    //get all of our posts
    function getAllProducts() public view returns (Post[] memory){
        return productArray;
    }

    //update a post with fact checker information
    function updateProduct(uint256 _id, string memory _name, uint256 _price, uint256 _quantity) public onlyOwner {
        require(products[_id].id !=0 , "Product is not available");
        deleteProduct(_id);
        products[_id] = Product(_id, _name, _price, _quantity);
        productArray.push(Product(_id, _name, _price, _quantity));
    }

    //so anyone can upvote/downvote a post based on fact checkers reviews
    function upVote() public {

    }

    function downVote() public {

    }

}