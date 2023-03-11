import networkx as nx
import matplotlib.pyplot as plt
import pandas as panda

df = panda.DataFrame({'from':['R','R','D04','D04','D06','D06'], 'to':['D04','D06','R','D06','R','D04']})
G = nx.from_pandas_edgelist(df, 'from', 'to', create_using=nx.DiGraph()) 


G['R']['D04']['weight'] = 243.0
G['R']['D06']['weight'] = 150.0
G['D06']['D04']['weight'] = 211.0
            
pos = nx.spring_layout(G)
labels = nx.get_edge_attributes(G,'weight')
nx.draw_networkx_edge_labels(G,pos, edge_labels=labels)

# Make the graph
nx.draw(G, with_labels=True, node_size=1500, alpha=0.3, font_weight="bold", arrows=True)


plt.axis('on')
plt.show()