# Javascript usage:
# var text = JSON.parse(file_contents);

import json

# conversation = [p,q,p,q,...]
# p = [prompt,prompt,prompt,prompt]
# prompts are dictionaries with
# .prompt_txt
# .response_txt
# .trust_pts 
# .love_pts 
# q = [question_string,[answer,answer,answer,answer]]
# answers are dictionaries with 
# .answer_txt
# .trust_pts 
# .love_pts 

def inputOps(filename):
	conversation = []
	inQ          = False
	inP          = False
	with open(filename, 'r') as f:
		for uglyline in f:
			line = uglyline.replace("\n","").replace("\r","")
			if line.startswith("TURN"):
				if inP:
					conversation.append(p)
				if inQ:
					conversation.append(q)
				inQ = False
				inP = False
			elif line.capitalize().startswith("Question: "):
				inQ   = True
				qtext = line.replace("Question: ","")
				q     = [qtext,[]]
				print(q)
			elif line.startswith("*"):
				if inQ:
					ans          = line.replace("*","")
					loveStart    = ans.index("[")
					loveEnd      = ans.index("]")
					love_string  = ans[loveStart+1:loveEnd].strip()
					ans          = ans.replace(ans[loveStart-1:loveEnd+1],"")
					trustStart   = ans.index("<")
					trustEnd     = ans.index(">")
					trust_string = ans[trustStart+1:trustEnd].strip()	
					ansText      = ans.replace(ans[trustStart-1:trustEnd+1],"")
					ansDict      = dict()
					ansDict["answer_text"] = ansText
					ansDict["trust_pts"]   = int(trust_string)
					ansDict["love_pts"]    = int(love_string)
					q[1].append(ansDict)

				else:
					if inP == False:
						inP = True
						p = []
					prompt       = line.replace("*","")
					loveStart    = prompt.index("[")
					loveEnd      = prompt.index("]")
					love_string  = prompt[loveStart+1:loveEnd].strip()
					prompt       = prompt.replace(prompt[loveStart-1:loveEnd+1],"")
					trustStart   = prompt.index("<")
					trustEnd     = prompt.index(">")
					trust_string = prompt[trustStart+1:trustEnd].strip()	
					prompt_string        = prompt.replace(prompt[trustStart-1:trustEnd+1],"")
					pDict                = dict()
					pDict["prompt_text"] = prompt_string
					pDict["love_pts"]    = int(love_string)
					pDict["trust_pts"]   = int(trust_string)
			elif line.startswith("#"):
					response              = line.replace("#","")
					pDict["response_txt"] = response
					if pDict not in p:
						p.append(pDict)
		if inP:
			conversation.append(p)
		if inQ:
			conversation.append(q)
	return conversation


def outputOps(obj,outname="out.json"):
	with open(outname,'w') as f:
		json_obj = json.dumps(obj,indent=2)
		f.write(json_obj)

def twine2json(filename,outname):
	conversation = inputOps(filename)
	#print(json.dumps(conversation))
	outputOps(conversation)

if __name__ == "__main__":
	twine2json("ch1test.txt","outfile.txt")
	print("fdajsl")

