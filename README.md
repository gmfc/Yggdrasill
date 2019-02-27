
# [Yggdrasill]
> powered by [colyseus](http://colyseus.io)

[![CodeFactor](https://www.codefactor.io/repository/github/gmfc/yggdrasill/badge)](https://www.codefactor.io/repository/github/gmfc/yggdrasill)

Simple server demo: https://ygds.herokuapp.com/

## What is it

Yggdrasill is (or rather, hopefully will be) the server of an opensource MMORPG.

I'm taking [Ragnarok Online](https://en.wikipedia.org/wiki/Ragnarok_Online) as inspiration.

## The Objective

The aim is to build a game capable to some degree of:

* Combat
  * PC vs NPC (PVE)
  * NPC vs NPC (EVE)
  * PC vs PC (PVP)
* Social
  * Friends list
  * Groups
  * Guilds
* Progression
  * Classless leveling
    * The more you use/do something, the better you get
  * Weapon/Armor proficiency/Level
    * The more you use a weapon/weapon class, the better you get
* Maps
  * One instance per map, many portal separated maps (Ragnarok online maps)
* NPCs
  * Agent based NPCs with schedules, itineraries etc...
  * Simulate farming basic resources, and making items.
* Economy
  * Open market
  * PCs and NPCs buys and sells from market with buy/sell orders or one on one negotiations
  * Every item can be manufactured by PCs/NPCs
  * NPC controlled auctions (PCs can sell items in auctions and both PCs and NPCs can buy)
* Extra
  * Persistent PC presence (Needs more thinking...)
    * When a player logout the PC stays in the game and assumes an agent based AI (configurated by the player)

## Tenets
> It's All About Social Interaction

1. Slow Regen
   1. Help eachother
1. No Quests
   1. Hunt oportunities
1. No level segregation
   1. Strong and weak players interact
1. Visually Diverse, Visually Recognizable Players
   1. Self identification
