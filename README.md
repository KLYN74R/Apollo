
<div align="center">

<img src="https://user-images.githubusercontent.com/53381472/174458851-d6cbe7cd-3696-48ef-8839-975f061e393f.png">

# <b>Apollo</b>

</div>

## 📖 Content

- [Short intro](#short_info)
- [How to build](#build)
- [Modularity](#modularity)
- [Advice](#advice)

<br/><br/>

<div name="short_info"></div>

## ⚡ Short intro 
<br/>
<p>
We're happy to present you Apollo - our powerful CLI & UI tool to control your KLYNTAR infrastructure. With this tool you can do everything - use it as wallet, interact with decentralized services, control your Unobtanium sources, deep dive into Cryptoland-our amazing collection of crypto algorithms available on KLYNTAR.
</p>

<br/><br/>

<div name="build"></div>

## 🏗️ How to build

<br/>

<p>
As you've seen, KLYNTAR is in symbiotic relationship with other blockchains. By running different nodes of other projects, working with tools required by them, the most auful & irritating problem was problem with initial setup - misconfigs, old docs, semver mistakes, nightly versions and so on. That's why, we've prepared docker image to allow you to be sure that you'll 100% have succesful setup. So,let's start 🚀

### <b>NOTE</b>
We assume that you have Docker on the board. You can install Docker for Linux & Windows & Mac <a href="https://docs.docker.com/engine/install/">here</a>

<br/><br/>

### <b>Download the image</b>

```shell

docker pull klyntar/all_in_one@sha256:dff001a9cd3da6328c504b52ed8a5748c47d23219feae220930dac1c1981cfe7

```

<br/><br/>

### <b>Run container</b>

<p>We also recomend you to make port forwarding at least for default Apollo port 9691</p>

### <b>NOTE</b>
This is the most default & simple way. If you need,you can manually do this with more advanced steps e.g. using volumes,set user and so on


```shell
docker run -dtp 9691:9691 --name test_kly klyntar/all_in_one@sha256:dff001a9cd3da6328c504b52ed8a5748c47d23219feae220930dac1c1981cfe7
```

<br/><br/>

### <b>Final</b>

Go into container to root dir

```shell
docker exec -ti test_kly bash

# Inside container

cd ~

```

Clone Apollo repository
```shell

git clone https://github.com/KLYN74R/Apollo.git

cd Apollo

```

Finally,run the only one command
```shell

pnpm run build

```

<div align="center">

  ## <b>Now take a rest and see the building process. It may take some minutes,but you're free from self-install tons of libs,dependencies and walking among dirs</b>

  <img src="https://i.pinimg.com/originals/d0/63/09/d063096ba4e07795c1bdf98572cb79a8.gif" style="height:200px;width:auto;">


<br/>

### The signs that build was succesful are messages to console like this
<br/>

  <img src="https://2131090630-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FphIHWZY173DpNXBbDjVg%2Fuploads%2FdewG1SQftz0ndvmG4fNa%2Fimage.png?alt=media&token=ad2710a7-0fd1-43cb-ad80-62e78badb989">

<br/>

### ...and this
<br/>

<img src="https://2131090630-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FphIHWZY173DpNXBbDjVg%2Fuploads%2FL3RavrjoA7nktQKFfV3i%2Fphoto_2022-06-04_11-55-04.jpg?alt=media&token=6363785e-a243-4f98-80ca-5ee83b97da87">
<br/>

### Now try to run. You should see the following
<br/>
<img src="https://user-images.githubusercontent.com/53381472/174460136-49cbf58b-fe08-4952-81b2-3b6e13d96444.jpg">
<br/>

</div>



<br/><br/>

<div name="modularity"></div>

## ⚙️ Modularity
<br/>
<p>

Working with different "hacking" tools,I've get the experience of so called 'best practises' of how to build real powerful tool. That's why, Apollo(as KLYNTAR) will be very modular. Just now,you have three ways to improve Apollo behaviour by loading modules to KLY_Modules, KLY_ServicesAPI and KLY_WorkflowsAPI

<br/>

### <b>KLY_Modules</b>

Directory for your external modules. This might be extra useful commands. Might be written by you or any other 3rd party. Must contain 2 directories <b>cli</b>(contains everything for commands in CLI) and <b>ui</b>(directory with everything for UI in browser). Soon we'll make a tutorial of HOWTO write modules for Apollo.

Each directory-is typically Git repository to allow you to easily update different modules independently if you need and swap versions. Moreover,soon you'll also have an amazing ability to verify authors cryptographically - via code signing. By having hash of repository you can verify authority and be sure that code is original using different crypto features like multisig or post-quantum cryptography,social staking and so on. We describe it in <a href="https://mastering.klyntar.org/beginning/basic-security#additional-features">Basic Security</a> in our MasteringKlyntar book.

<br/><br/>

- CLI part

In CLI extra modules looks like ordinary commands. To allow your users to differ them, please, give them original prefix or make a single command with repository name and hide commands to subcommands 

- UI part

If module also has a UI part(which is often the case), then you'll have ability to visit:

```shell

http(s)://<your_interface>:<port>/modules

```

to find there the entry point to your module.

<br/>

#### <b>Summarizing this,your directories tree on these levels should look like this</b>


```
Apollo
│     
│   
└───KLY_Modules
│   │   
│   │
│   │   
│   └───init(default module,the entry point for the other)
│   │    │   
│   │    │───cli(directory for files to improve CLI)
│   │    │   │
│   │    │   └───init.js 
│   │    │
│   │    └───ui(directory for files to improve UI)
│   │        │
│   │        │───routes.js
│   │        │───templates(.ejs files)
│   │        │     └─...
│   │        │───configs.json
│   │        └───...
│   │   
│   │
│   └───your_custom_module
│        │   
│        │───cli(directory for files to improve CLI)
│        │    │   
│        │    └───init.js
│        │
│        └───ui(directory for files to improve UI)
│            │
│            │───routes.js
│            │───templates(.ejs files)
│            │     └─...
│            │───configs.json
│            └───...
│
│
└───KLY_ServicesAPI
    └───...

```

To update the repository with module go to appropriate directory <b>KLY_Modules/<your_module></b> and pull changes

<br/>

### <b>KLY_ServicesAPI</b>

<br/>

> <b>ServiceAPI</b> - directory with API repositories to interact with the scope of service runned on Klyntar. Imagine if all smart contracts on ETH will have a unique design in your wallet, separate page with all available features specific to contract. Since we have wider power, we also have so complicated way to improve abilities of your Apollo instance.

<br/>


The same principle for services API. The same way it's a repository in this directory, the same way you should update it and so on. To check available services API go to

```shell

http(s)://<your_interface>:<port>/services

```

to check your current services

<br/><br/>

### <b>KLY_WorkflowsAPI</b>

<br/>

> <b>WorkflowsAPI</b> - directory with API repositories to interact with symbiotes on Klyntar. Insofar as they can use different workflows(thanksfully to <a href="https://mastering.klyntar.org/beginning/mutations">Mutations principle</a>),we need to make possible to use appropriate algorithms,build right events to send to symbiotes and use other specific features like traffic over TOR or threshold signatures. Imagine if you'll have ability to control your Bitcoin, Solana, Avalanche, Cosmos assets(native coins,tokens,etc.), execute smart contracts, make delegations using only one instrument. Yes,this is what Apollo do.

<br/>

The same principle for services API. The same way it's a repository in this directory, the same way you should update it and so on. To check available services API go to

```shell

http(s)://<your_interface>:<port>/symbiotes

```


to check your symbiotes and how to interact with them


<br/><br/>

<div name="advice"></div>

## 🤓 Advice
<br/>
<p>
Follow us to get the news & updates ASAP. We're happy to involve new members to KLY community 😊
</p>