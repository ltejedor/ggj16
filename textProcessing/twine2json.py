import json

def inputOps(filename):
	convDict = dict()
	inQ     = False
	inP     = False
	i       = 0 # turn number
	with open(filename, 'r') as f:
		for uglyline in f:
			line = uglyline.replace("\n","")
			if line.startswith("TURN"):
				inQ = False
				inP = False
				i   = int("".join([x for x in line if x.isdigit()]))
			elif line.capitalize().startswith("Question: "):
				inQ = True
				qtext = line.replace("Question: ","")
				convDict[i] = dict{}
				convDict[i]["type"]="question"
				convDict[i]["qtext"] = qtext
				convDict[i]["answers"]= dict()
			elif line.startswith("*"):
				if inQ:
					ans = line.replace("*","")
					scoreStart = ans.index("[")
					scoreEnd = ans.index("]")
					numString = ans[scoreStart+1:scoreEnd].strip()
					ansText = ans.replace(ans[scoreStart-1:scoreEnd+1],"")
					ansDict = dict()
					ansDict["text"] = ansText
					ansDict["pts"]  = int(numString)
					print(i)
					print(json.dumps(convDict))
					convDict[i].["answers"]["text"]
					
				else:
					prompt = line.replace("*","")
					scoreStart = prompt.index("[")
					scoreEnd = prompt.index("]")
					numString = prompt[scoreStart+1:scoreEnd].strip()
					promptText = prompt.replace(prompt[scoreStart-1:scoreEnd+1],"")
					if inP == False:
						pDict = dict()
						inP   = True
					pDict["text"] = promptText
					pDict["pts"]  = int(numString)
					convDict[i].append(pDict)
	return convDict


def outputOps(obj,outname="out.json"):
	with open(outname,'w') as f:
		f.write(json.dumps(obj,indent=2))

def twine2json(filename,outname):
	convDict = inputOps(filename)
	print(json.dumps(convDict))
	outputOps(convDict)

if __name__ == "__main__":
	twine2json("sample.txt","outfile.txt")