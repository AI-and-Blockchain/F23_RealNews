pragma solidity ^0.8.0;

contract NewsContract {
    //struct to represent all info we need about each hash
    struct Post {
        uint256 id;
        string claimHash;
        string factCheckHash;
        uint256 upvotes;
        uint256 downvotes;
        uint256 hashCheck;
    }
    address owner;
    //all posts
    mapping (uint256 => Post) public posts;
    uint256 public postCount = 0; // To keep track of posts

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
    function createPost(string memory _claimHash) public onlyOwner {
        posts[postCount] = Post(postCount, _claimHash, "", 0, 0);
        postCount++;
    }

    function updatePost(uint256 _id, string memory _factCheckHash) public onlyOwner {
        require(_id < postCount, "Post does not exist");
        Post storage post = posts[_id];
        post.factCheckHash = _factCheckHash;
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
    function upVote(uint256 _id) public {
        require(_id < postCount, "Post does not exist");
        posts[_id].upvotes += 1;
    }

    function downVote(uint256 _id) public {
        require(_id < postCount, "Post does not exist");
        posts[_id].downvotes += 1;
    }

    function getPost(uint256 _id) public view returns (Post memory) {
        require(_id < postCount, "Post does not exist");
        return posts[_id];
    }

    function getAllPosts() public view returns (Post[] memory) {
        Post[] memory allPosts = new Post[](postCount);
        for (uint i = 0; i < postCount; i++) {
            allPosts[i] = posts[i];
        }
        return allPosts;
    }
}