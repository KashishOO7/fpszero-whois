---
title: "How a password manager works and let’s create one in python language."
author: "Kashish Charaya (FPSZERO)"
date: 2022-04-08
source: medium
source_url: "https://medium.com/@kashi.sh/how-a-password-manager-works-and-lets-create-one-in-python-language-2fd6d1bd6955"

category: security
tags: [passwords, privacy]
---
Let’s understand how a password manager works and how to create one using python language. I’ll be as brief in explaining as I can.

---

_Let’s understand how a password manager works and how to create one using python language. I’ll be as brief in explaining as I can._

**Working of an actual Password manager?**

You must be thinking why someone would even use a password manager because it’s not safe to put all your credentials in a single box. What if it gets compromised or let’s say hacked. But then let me ask you where would you wanna store them if not here? Because of course, you can’t remember all your passwords, you’re not a memory champion. It’s not safe to store them in a browser as it’s highly unsafe, yeah it’s convenient to click “save password” and let the browser keep it for you but still, it’s not a good idea. Whereas in the case of a password manager, it’s sole purpose is to keep your credentials safe, has Multi-Factor Authentication, uses 256-bit AES encryption a military-grade level cipher used to encrypt and decrypt data, also uses Zero-knowledge proof and they also help you to check if your credentials have been pwned. You just need to remember a single master password.

There are two most popular implementations of password managers which are Local-Based and Cloud-Based, As the name implies, Local-Based stores your passwords offline on a particular device where you are logged in and the risk of getting hacked is minimal as it’s stored on your local database. Someone first has to take control over your device and then try to break into the database but that is still very difficult to brute force the military-grade encryption. But it does have some flaws like you can’t access your passwords on any other devices as it’s stored only in one location and that requires manual labor to access them. 
Now the Cloud-Based password managers store your credentials on cloud storage which you can access on multiple devices from anywhere unless you have your master password, to be more secure, use some 2FA. These days all reputed password managers use zero-knowledge technology which means all your data is encrypted on your device locally before being sent to the server.

**Let’s talk about the encryption part:-**
256-bit AES encryption is a military-grade level cipher which is used to encrypt and decrypt the passwords where AES is the encryption and 256-bit is the key means 2²⁵⁶ combinations are available.

**Now let’s create one with python language which will store your passwords in a database and in an encrypted form.**
**Note**: _It’s just a prototype, don’t actually use this to store any of your passwords._

I used PostgreSQL for the database and I’ve mentioned the steps to set-up the manager in my GitHub README file and the code is easily understandable. The master password you create will be hashed and stored in a .txt file in the same directory which can’t be unhashed. When you enter the master password to access the vault, it also get hashed and will be checked with the original hashed master password that you created in the beginning. If both are same then you will be granted the access otherwise no luck.

---

Adding some credentials using CLI which will be stored in the PostgreSQL in an encrypted form. And to find the credentials you can use this menu but if you want to delete anything then you have to use the psql CLI and enter the commands to find, delete the data in the table.

Here’s the complete code for the [project](https://github.com/KashishOO7/Password-Manager-in-python).

I hope you found this article knowledgeable and insightful. If you have doubts regarding the code, just leave me a comment and I’ll get back to you ASAP. Thanks for reading. Stay connected and **_remember_** **_Never stop learning_**.

_Peace out!_
