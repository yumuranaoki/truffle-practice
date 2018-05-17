pragma solidity ^0.4.17;

contract Voting {
    struct Vote {
        uint voteId;
        uint8 amount; 
    }

    struct Option {
        uint id;
        uint8 point;
    }

    struct Theme {
        uint id;
        uint[] optionsIdInTheme;
    }

    Option[] public options;

    function newOption() external {
        uint id = options.length;
        options.push(Option(id, 0));
    }

    function add(uint _num) public pure returns(uint) {
        return _num++;
    } 
}