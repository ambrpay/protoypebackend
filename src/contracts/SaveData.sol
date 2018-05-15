pragma solidity ^0.4.0;
    
// A simple smart contract
contract SaveDataContract {
    string _data;
    address _owner;

    function SaveDataContract(string data) public {
        _data = data;
        _owner = msg.sender;
    }
    
    function getData() constant returns(string) {
        return _data;
    }
    
}