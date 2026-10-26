---
title: "Are files from your computer ever permanently deleted or where do they go?"
author: "Kashish Charaya (FPSZER∅)"
date: 2022-02-24
source: medium
source_url: "https://medium.com/@kashi.sh/are-files-from-your-computer-ever-permanently-deleted-or-where-do-they-go-466eeb6ba65f"

category: security
tags: [forensics, privacy]
---
Remember deleting the text you thought twice before sending to them, it was deleted. right? And are you sure when you sold your old phone…

---

### Are files from your computer ever permanently deleted or where do they go?

Remember deleting the text you thought twice before sending to them, it was deleted. right? And are you sure when you sold your old phone or laptop, the data you thought you deleted from your device was really deleted or was it just lost in bits that could be found by someone who’s willing to know what was there in your phone or laptop?

Simply, selecting the file, clicking delete, and then emptying the recycle bin seems so easy that your file is gone forever now but not really. What if I say you can undelete a file after it’s being deleted but only if it hasn’t been overwritten yet. Or maybe it has been corrupted or melded with some other data and has become a mixed data smoothie. 
But maybe you don’t want anyone to recover the data and you can make this happen by overwriting the data as many times as you want but here come the bad sectors of drives. Which are caused by failed transistors or physical damage. Basically, _(A bad sector in computing is a disk sector on a disk storage unit that is permanently damaged. Upon taking damage, all information stored in that sector is lost. When a bad sector is found and marked, the operating system like Windows or Linux will skip it in the future)_or by shredding the drive, or physically polarizing it. 
In simple words, deleting and emptying the recycle bin just marks the space in the drive or folder as empty which means you can add or store new data to the drive that now will overwrite the existing data and is more like deleting a chapter from a book by marking it empty. Now, you can write anything on that page because it’s marked empty and by doing this you will overwrite the contents of that chapter.

### How To Securely Delete Files?

When we delete a file, we only delete the pointer which is just a directional sign that tells you where that particular data is located in the drive. The pointer doesn’t represent the data itself but rather it just represents where you would find that file or data. To completely delete the data after emptying the recycle bin, you can run an open-source application _“_[_BleachBit_](https://www.bleachbit.org/)_”_. It will overwrite the free space with 0s and then will remove them as it’s not going to free up any space but will only overwrite the free space which has no pointers in it. To be more sure you can pass any random data so it will be much harder for someone to recover the data.

Thanks for reading. Stay connected and **Never stop learning.**

_Peace out!_
