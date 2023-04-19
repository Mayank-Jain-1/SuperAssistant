const text_splitter = require("langchain/text_splitter");



const z = new text_splitter.RecursiveCharacterTextSplitter();
const split = async () => {
   const c = await z
      .splitText(
         `StockChain is a cutting-edge blockchain platform that aims to revolutionize the way people trade stocks. It provides a secure, decentralized, and transparent platform for buying and selling stocks, offering a more efficient and reliable way to trade assets without intermediaries.

         At the core of StockChain is blockchain technology, which enables the creation of smart contracts that automatically execute trades and settlements. These contracts are self-executing and are stored on a decentralized network of computers, making them immutable, tamper-proof, and transparent.
         
         StockChain has two types of contracts: Stock Contract and Trader Contract. The Stock Contract contains information about each stock, such as its name, initial price, and amount to be deployed. The Trader Contract holds trading information for each trader, including current holdings and past transactions. A Whitelist contract is used to verify stocks, traders, and their information.
         
         To use StockChain, you need to have MetaMask installed in your browser. Once installed, you can access the platform using a preset wallet address known as the "Government Wallet Address." This address is used to deploy new stocks to the Stock Contract.
         
         Traders can also be generated and pushed into the whitelist contract using the same Government account. Each wallet address is mapped to a single trader contract address, which holds the trader's trading information.
         
         Once the stocks and traders are deployed, traders can use their own wallet address and trader contract address to access the StockChain Marketplace and buy and sell stocks. Traders can view their current holdings in the market by entering their trader contract address.
         
         When a stock is sold, Ethereum is stored in the trader's contract address. Using the trader's wallet address, all funds in the contract can be withdrawn into the wallet from the Marketplace itself.
         
         StockChain is an innovative platform that offers a range of benefits for traders and investors. By using blockchain technology, it eliminates the need for intermediaries, reduces settlement time to a matter of seconds, and provides a transparent and secure platform for trading stocks.
         
         Moreover, StockChain offers a more efficient and cost-effective way to trade stocks. With traditional stock exchanges, investors need to pay a range of fees and commissions, which can add up over time. With StockChain, there are no intermediaries involved, which means that investors can trade directly with one another, cutting out the costs and fees associated with traditional stock exchanges.
         
         Overall, StockChain is a game-changing platform that offers a more efficient, cost-effective, and reliable way to trade stocks. It provides a secure and transparent platform for investors looking to enter the digital asset space, making it an attractive option for traders and investors alike.`,
      )
   c.forEach((text,index) => {
      console.log("text-",index,"\n\n",text,"\n\n")
   })
};

split();