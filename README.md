# Thunderboom - TWY 🎵
![](https://github.com/HappyPantss/TWY/blob/chatbot/public/images/documentation/READMEcover.JPG)

TWY is an upcoming music artist, created by [Thunderboom Records](https://www.thunderboomrecords.com/) to make people enjoy ai-generated music. This project is made for her fans, making them able to contact TWY and talk to her.

[Click here for the live demo](https://happypantss.github.io/TWY/)

# Table of Contents 🧭
1. [Goal](https://github.com/HappyPantss/TWY#goal-)
2. [Getting started](https://github.com/HappyPantss/TWY#getting-started-)
3. [Wishlist](https://github.com/HappyPantss/TWY#feature-wishlist--backlog-)
4. [Practises](https://github.com/HappyPantss/TWY#design-patterns-and-best-practices-)
5. [Packages](https://github.com/HappyPantss/TWY#packages-used-)

# Goal 💪🏻
The goal of this project is to make fans able to communicate with TWY. The interaction should flow easily and naturally. Because of our short time-span, the project is not focused on building an entire chatbot with a huge personality. Instead, we want to focus on user interface and experience.

# Getting started ✨
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

## Technical requirements
To run this project you'll need [Git](https://git-scm.com/downloads), [Nodejs](https://nodejs.org/en/download/) and any [code editor](https://code.visualstudio.com/download)

## 📥 Installing
### 1. Clone this repository 👯
Before we can get started, we'll need to clone this repository. We can do this by typing the following line of code in the terminal:
```bash
git clone https://github.com/HappyPantss/TWY.git
```
### 2. Install the packages 💻
First we need to install the used NPM packages.
```bash
npm install
```
### 3. Start developer environment 🎬
Now we can run our application, by running the following line of code in your terminal:
```bash
npm run dev
```

### 4. Navigate to localhost 🌐
Congratulations! If everything works, you should be able to see the application running in your browser. Please note that the port won't always be the same number.
```
http://localhost:3000
```

# Feature wishlist / backlog 👑
Below is a list of features we'd love to add to this application. The features are split up using the **M**o**SC**o**W** method.

**M** - Must haves
_These features are requirements for the end product_
- [x] User can input a message
- [x] TWY responds with a (semi-)reaction
- [x] Project is responsive

**S** - Should haves
_These features are wanted, but not necessary for a usable product_
- [x] Futuristic styling
- [ ] Audio visualization

**C** - Could haves
_These features can be added if there is enough time to do so_
- [ ] Personality traits
- [ ] AI-generated face

**W** - Would haves
_These features can be added in the future_
- [ ] Dataset containing enough data to give good reactions

# Design patterns and Best Practices 👩🏻‍💻
__Code standards are important__ when working on any project; your code stays *consistent* and is *readable* for everyone. I defined code standards for __HTML__, __CSS__ and __JS__ while working on this project.

## Javascript code standards
* Variables & functions are written in __camelCase__
* Promises are handled with __async functions__ using await
* I don't use var, only __const__ or __let__
* I put __spaces around operators__ ( = + - * / ) and after commas (exception for for loops)
* I use indentation with __TAB__
* I always end a statement with a __semi-colon;__
* Functions have their opening bracket on the __same line__ as the name, with 1 space in between
* I use __ES6 syntax__ where possible

## CSS code standards
* I try to avoid __!important__ as much as possible
* Layout/general styling is always __above__ more specific styling
* Selectors are not unnecessary __long__ nor __short__
* I use __CSS3 syntax__ where possible
* I avoid old display properties like float
* CSS Selectors must have a __space__ between the name and bracket

## HTML code standards
* I only use IDs when the element is present __once__ on a page and it's necessary for styling or Javascript
* I always write semantic HTML according to __W3C Validator__
* Divs are only used when __necessary__ for styling purposes
* Classes allow easy __re-usage__
* Indentation is always __clear__

# Packages used 📦
* [Nodemon](https://www.npmjs.com/package/nodemon) - Used for auto refreshing the server

# License 🔐
This project is licensed under the MIT license by © HappyPantss, 2021. See the [LISENCE.md](https://github.com/HappyPantss/TWY/blob/master/LICENSE) file for details.
