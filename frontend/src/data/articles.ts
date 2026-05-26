export type Article = {
  id: number
  slug: string
  categoryFr: string
  categoryEn: string
  categoryColor: string
  emoji: string
  titleFr: string
  titleEn: string
  excerptFr: string
  excerptEn: string
  date: string
  dateEn: string
  readTime: string
  tags: string[]
  contentFr: string
  contentEn: string
}

export const articles: Article[] = [
  {
    id: 1,
    slug: 'langgraph-vs-crewai',
    categoryFr: 'IA Agentique',
    categoryEn: 'Agentic AI',
    categoryColor: 'blue',
    emoji: '🤖',
    titleFr: 'LangGraph vs CrewAI : Quelle architecture multi-agents choisir ?',
    titleEn: 'LangGraph vs CrewAI: Which multi-agent architecture to choose?',
    excerptFr: "Comparaison approfondie des deux frameworks leaders pour l'orchestration d'agents autonomes en production. Architectures, performances, cas d'usage.",
    excerptEn: "In-depth comparison of the two leading frameworks for orchestrating autonomous agents in production. Architectures, performance, use cases.",
    date: '12 Avril 2025',
    dateEn: 'April 12, 2025',
    readTime: '7 min',
    tags: ['LangGraph', 'CrewAI', 'Multi-Agent', 'LLM', 'Python'],
    contentFr: `## Introduction

Avec l'essor de l'IA agentique, deux frameworks se distinguent clairement : **LangGraph** (de LangChain) et **CrewAI**. J'ai eu l'occasion de travailler intensivement avec les deux chez Kirusa pour orchestrer des agents autonomes en production. Voici mon retour d'expérience objectif.

## Qu'est-ce qu'un agent autonome ?

Un agent autonome est un système qui peut :
- **Percevoir** son environnement (outils, APIs, données)
- **Raisonner** à l'aide d'un LLM (GPT-4, Claude, Llama...)
- **Agir** en appelant des outils ou en prenant des décisions
- **Apprendre** de ses erreurs via des boucles de feedback

Le vrai défi n'est pas de créer un agent, mais d'en orchestrer plusieurs qui collaborent efficacement.

## LangGraph : le graphe d'états

LangGraph modélise votre workflow comme un **graphe orienté**. Chaque nœud est une étape, chaque arête est une transition conditionnelle.

\`\`\`python
from langgraph.graph import StateGraph, END
from typing import TypedDict, Annotated
import operator

class AgentState(TypedDict):
    messages: Annotated[list, operator.add]
    next_action: str
    result: str

def researcher_node(state: AgentState):
    """Agent de recherche d'informations"""
    response = llm.invoke(state["messages"])
    return {"messages": [response], "next_action": "analyze"}

def analyzer_node(state: AgentState):
    """Agent d'analyse des résultats"""
    analysis = llm.invoke([
        *state["messages"],
        HumanMessage("Analyse ces résultats en détail")
    ])
    return {"messages": [analysis], "next_action": "end"}

# Construction du graphe
workflow = StateGraph(AgentState)
workflow.add_node("researcher", researcher_node)
workflow.add_node("analyzer", analyzer_node)
workflow.add_edge("researcher", "analyzer")
workflow.add_edge("analyzer", END)
workflow.set_entry_point("researcher")

app = workflow.compile()
\`\`\`

### Points forts de LangGraph

✅ **Contrôle total** sur le flux d'exécution
✅ **State management** typé et persistant
✅ **Cycles et boucles** nativement supportés
✅ **Debugging** visuel avec LangSmith
✅ **Human-in-the-loop** facile à intégrer

### Limites de LangGraph

❌ Courbe d'apprentissage plus raide
❌ Verbeux pour des workflows simples
❌ Nécessite de bien concevoir l'état dès le départ

## CrewAI : la métaphore d'équipe

CrewAI adopte une approche radicalement différente : vous définissez des **agents avec des rôles**, des **tâches** et une **équipe (crew)**. C'est intuitif, presque comme manager une équipe humaine.

\`\`\`python
from crewai import Agent, Task, Crew, Process
from crewai_tools import SerperDevTool, WebsiteSearchTool

# Définition des agents
researcher = Agent(
    role="Senior Research Analyst",
    goal="Trouver les informations les plus pertinentes sur le sujet",
    backstory="""Tu es un expert en recherche avec 10 ans d'expérience.
    Tu sais distinguer les sources fiables des sources douteuses.""",
    tools=[SerperDevTool(), WebsiteSearchTool()],
    verbose=True,
    llm="gpt-4o"
)

writer = Agent(
    role="Technical Content Writer",
    goal="Rédiger des articles clairs et engageants",
    backstory="Tu transformes des recherches complexes en contenu accessible.",
    verbose=True,
    llm="gpt-4o"
)

# Définition des tâches
research_task = Task(
    description="Recherche les dernières avancées en {topic}",
    expected_output="Un rapport structuré avec 5 insights clés",
    agent=researcher
)

writing_task = Task(
    description="Rédige un article de blog basé sur la recherche fournie",
    expected_output="Un article de 800 mots structuré avec des exemples concrets",
    agent=writer,
    context=[research_task]
)

# Lancement de l'équipe
crew = Crew(
    agents=[researcher, writer],
    tasks=[research_task, writing_task],
    process=Process.sequential,
    verbose=True
)

result = crew.kickoff(inputs={"topic": "IA Agentique en 2025"})
\`\`\`

### Points forts de CrewAI

✅ **API intuitive** — productif en 30 minutes
✅ **Role-playing** riche pour les agents
✅ **Délégation** inter-agents native
✅ **Memory** long-terme intégrée
✅ **Marketplace** de crews prêts à l'emploi

### Limites de CrewAI

❌ Moins de contrôle sur le flux exact
❌ Debugging plus difficile en production
❌ Gestion d'état complexe limitée

## Tableau comparatif

| Critère | LangGraph | CrewAI |
|---------|-----------|--------|
| Facilité de démarrage | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| Contrôle du flux | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| Workflows cycliques | ✅ Natif | ⚠️ Limité |
| State management | ✅ Typé | ⚠️ Basique |
| Human-in-the-loop | ✅ Excellent | ⚠️ Partiel |
| Debugging | ✅ LangSmith | ⚠️ Logs |
| Courbe d'apprentissage | 📈 Haute | 📉 Basse |
| Production-ready | ✅ | ✅ |

## Mon verdict

**Utilisez LangGraph si :**
- Vous avez des workflows complexes avec des cycles et conditions multiples
- Vous avez besoin d'un state management précis et typé
- Vous déployez en production avec des exigences de fiabilité élevées
- Vous intégrez des boucles human-in-the-loop

**Utilisez CrewAI si :**
- Vous prototypez rapidement une idée
- Vos agents ont des rôles métier bien définis
- Votre équipe n'a pas d'expérience en graphes d'états
- Vous voulez un résultat fonctionnel en quelques heures

## L'approche hybride (ce que je fais chez Kirusa)

En pratique, j'utilise les deux ! LangGraph pour l'orchestration globale du workflow, et des "sous-crews" CrewAI pour des tâches spécialisées. C'est le meilleur des deux mondes.

\`\`\`python
# LangGraph comme orchestrateur principal
def crewai_research_node(state: AgentState):
    """Nœud LangGraph qui délègue à un Crew CrewAI"""
    crew = Crew(
        agents=[researcher, analyst],
        tasks=[research_task, analysis_task],
        process=Process.sequential
    )
    result = crew.kickoff(inputs={"query": state["query"]})
    return {"research_result": result.raw}
\`\`\`

## Conclusion

Il n'y a pas de meilleur framework universel. LangGraph vous donne la puissance, CrewAI vous donne la vitesse. Connaître les deux est un avantage compétitif réel en 2025.`,

    contentEn: `## Introduction

With the rise of agentic AI, two frameworks stand out: **LangGraph** (by LangChain) and **CrewAI**. I've had the opportunity to work intensively with both at Kirusa to orchestrate autonomous agents in production. Here's my objective feedback.

## What is an autonomous agent?

An autonomous agent is a system that can:
- **Perceive** its environment (tools, APIs, data)
- **Reason** using an LLM (GPT-4, Claude, Llama...)
- **Act** by calling tools or making decisions
- **Learn** from its mistakes through feedback loops

The real challenge isn't creating an agent — it's orchestrating multiple agents that collaborate effectively.

## LangGraph: the state graph

LangGraph models your workflow as a **directed graph**. Each node is a step, each edge is a conditional transition.

\`\`\`python
from langgraph.graph import StateGraph, END
from typing import TypedDict, Annotated
import operator

class AgentState(TypedDict):
    messages: Annotated[list, operator.add]
    next_action: str
    result: str

def researcher_node(state: AgentState):
    """Information research agent"""
    response = llm.invoke(state["messages"])
    return {"messages": [response], "next_action": "analyze"}

def analyzer_node(state: AgentState):
    """Results analysis agent"""
    analysis = llm.invoke([
        *state["messages"],
        HumanMessage("Analyze these results in detail")
    ])
    return {"messages": [analysis], "next_action": "end"}

# Build the graph
workflow = StateGraph(AgentState)
workflow.add_node("researcher", researcher_node)
workflow.add_node("analyzer", analyzer_node)
workflow.add_edge("researcher", "analyzer")
workflow.add_edge("analyzer", END)
workflow.set_entry_point("researcher")

app = workflow.compile()
\`\`\`

### LangGraph strengths

✅ **Total control** over execution flow
✅ **Typed and persistent** state management
✅ **Cycles and loops** natively supported
✅ **Visual debugging** with LangSmith
✅ **Human-in-the-loop** easy to integrate

### LangGraph limitations

❌ Steeper learning curve
❌ Verbose for simple workflows
❌ Requires careful state design upfront

## CrewAI: the team metaphor

CrewAI takes a radically different approach: you define **agents with roles**, **tasks**, and a **crew**. It's intuitive — almost like managing a human team.

\`\`\`python
from crewai import Agent, Task, Crew, Process
from crewai_tools import SerperDevTool, WebsiteSearchTool

# Agent definitions
researcher = Agent(
    role="Senior Research Analyst",
    goal="Find the most relevant information on the topic",
    backstory="""You are a research expert with 10 years of experience.
    You know how to distinguish reliable sources from unreliable ones.""",
    tools=[SerperDevTool(), WebsiteSearchTool()],
    verbose=True,
    llm="gpt-4o"
)

writer = Agent(
    role="Technical Content Writer",
    goal="Write clear and engaging articles",
    backstory="You transform complex research into accessible content.",
    verbose=True,
    llm="gpt-4o"
)

# Task definitions
research_task = Task(
    description="Research the latest advances in {topic}",
    expected_output="A structured report with 5 key insights",
    agent=researcher
)

writing_task = Task(
    description="Write a blog article based on the provided research",
    expected_output="An 800-word article structured with concrete examples",
    agent=writer,
    context=[research_task]
)

# Launch the crew
crew = Crew(
    agents=[researcher, writer],
    tasks=[research_task, writing_task],
    process=Process.sequential,
    verbose=True
)

result = crew.kickoff(inputs={"topic": "Agentic AI in 2025"})
\`\`\`

### CrewAI strengths

✅ **Intuitive API** — productive in 30 minutes
✅ **Rich role-playing** for agents
✅ **Native** inter-agent delegation
✅ **Long-term memory** built-in
✅ **Marketplace** of ready-to-use crews

### CrewAI limitations

❌ Less control over exact flow
❌ Harder debugging in production
❌ Complex state management is limited

## Comparison table

| Criteria | LangGraph | CrewAI |
|----------|-----------|--------|
| Ease of start | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| Flow control | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| Cyclic workflows | ✅ Native | ⚠️ Limited |
| State management | ✅ Typed | ⚠️ Basic |
| Human-in-the-loop | ✅ Excellent | ⚠️ Partial |
| Debugging | ✅ LangSmith | ⚠️ Logs |
| Learning curve | 📈 High | 📉 Low |
| Production-ready | ✅ | ✅ |

## My verdict

**Use LangGraph if:**
- You have complex workflows with multiple cycles and conditions
- You need precise and typed state management
- You're deploying to production with high reliability requirements
- You're integrating human-in-the-loop loops

**Use CrewAI if:**
- You're rapidly prototyping an idea
- Your agents have well-defined business roles
- Your team has no experience with state graphs
- You want a working result in a few hours

## The hybrid approach (what I do at Kirusa)

In practice, I use both! LangGraph for the global workflow orchestration, and CrewAI "sub-crews" for specialized tasks. It's the best of both worlds.

## Conclusion

There's no universal best framework. LangGraph gives you power, CrewAI gives you speed. Knowing both is a real competitive advantage in 2025.`
  },

  {
    id: 2,
    slug: 'mcp-model-context-protocol',
    categoryFr: 'LLM & MCP',
    categoryEn: 'LLM & MCP',
    categoryColor: 'purple',
    emoji: '🔗',
    titleFr: 'MCP (Model Context Protocol) : Le futur des outils LLM',
    titleEn: 'MCP (Model Context Protocol): The future of LLM tools',
    excerptFr: "Comprendre et implémenter le protocole MCP d'Anthropic pour connecter vos agents IA à n'importe quel outil ou source de données externe.",
    excerptEn: "Understanding and implementing Anthropic's MCP protocol to connect your AI agents to any external tool or data source.",
    date: '28 Mars 2025',
    dateEn: 'March 28, 2025',
    readTime: '9 min',
    tags: ['MCP', 'Anthropic', 'Claude', 'LLM', 'Tools', 'Python'],
    contentFr: `## Qu'est-ce que MCP ?

Le **Model Context Protocol (MCP)** est un protocole open-source lancé par Anthropic en novembre 2024. Son objectif : standardiser la façon dont les LLMs interagissent avec des outils, des bases de données et des APIs externes.

Avant MCP, chaque intégration LLM-outil était ad-hoc. Avec MCP, vous avez un protocole universel : **un serveur MCP expose des capacités, un client LLM les consomme**.

## L'architecture MCP

\`\`\`
┌─────────────────┐     MCP Protocol      ┌──────────────────┐
│   LLM Client    │ ◄────────────────────► │   MCP Server     │
│  (Claude, etc.) │                        │  (vos outils)    │
└─────────────────┘                        └──────────────────┘
         │                                          │
    Fait des                                  Expose des
    requêtes                                  Resources
    d'outils                                  Tools
                                              Prompts
\`\`\`

MCP définit trois primitives :
- **Resources** : données statiques ou dynamiques (fichiers, DB)
- **Tools** : fonctions que le LLM peut appeler
- **Prompts** : templates de prompts réutilisables

## Créer votre premier serveur MCP

Voici un serveur MCP qui expose des outils de gestion de base de données PostgreSQL :

\`\`\`python
from mcp.server import Server
from mcp.server.models import InitializationOptions
from mcp.server.stdio import stdio_server
from mcp.types import Tool, TextContent, Resource
import asyncpg
import json
import asyncio

server = Server("postgres-mcp-server")

# Pool de connexions
DB_POOL = None

async def get_pool():
    global DB_POOL
    if not DB_POOL:
        DB_POOL = await asyncpg.create_pool(
            "postgresql://user:password@localhost/mydb"
        )
    return DB_POOL

@server.list_tools()
async def list_tools() -> list[Tool]:
    """Déclare les outils disponibles"""
    return [
        Tool(
            name="query_database",
            description="Exécute une requête SQL SELECT sur la base de données",
            inputSchema={
                "type": "object",
                "properties": {
                    "query": {
                        "type": "string",
                        "description": "La requête SQL à exécuter"
                    },
                    "limit": {
                        "type": "integer",
                        "description": "Nombre maximum de résultats",
                        "default": 10
                    }
                },
                "required": ["query"]
            }
        ),
        Tool(
            name="get_table_schema",
            description="Récupère le schéma d'une table",
            inputSchema={
                "type": "object",
                "properties": {
                    "table_name": {
                        "type": "string",
                        "description": "Nom de la table"
                    }
                },
                "required": ["table_name"]
            }
        )
    ]

@server.call_tool()
async def call_tool(name: str, arguments: dict) -> list[TextContent]:
    """Gère les appels d'outils"""
    pool = await get_pool()

    if name == "query_database":
        query = arguments["query"]
        limit = arguments.get("limit", 10)

        # Sécurité : seulement des SELECT
        if not query.strip().upper().startswith("SELECT"):
            return [TextContent(
                type="text",
                text="Erreur : Seules les requêtes SELECT sont autorisées"
            )]

        async with pool.acquire() as conn:
            rows = await conn.fetch(f"{query} LIMIT {limit}")
            data = [dict(row) for row in rows]
            return [TextContent(
                type="text",
                text=json.dumps(data, default=str, indent=2)
            )]

    elif name == "get_table_schema":
        table_name = arguments["table_name"]
        async with pool.acquire() as conn:
            schema = await conn.fetch("""
                SELECT column_name, data_type, is_nullable
                FROM information_schema.columns
                WHERE table_name = $1
                ORDER BY ordinal_position
            """, table_name)
            return [TextContent(
                type="text",
                text=json.dumps([dict(row) for row in schema], indent=2)
            )]

async def main():
    async with stdio_server() as (read_stream, write_stream):
        await server.run(
            read_stream,
            write_stream,
            InitializationOptions(
                server_name="postgres-mcp-server",
                server_version="1.0.0"
            )
        )

if __name__ == "__main__":
    asyncio.run(main())
\`\`\`

## Connecter Claude à votre serveur MCP

\`\`\`python
import anthropic
import subprocess
import asyncio
from mcp import ClientSession, StdioServerParameters
from mcp.client.stdio import stdio_client

async def query_with_mcp(user_question: str):
    """Interroge Claude avec accès à votre base de données via MCP"""

    server_params = StdioServerParameters(
        command="python",
        args=["postgres_mcp_server.py"],
        env=None
    )

    async with stdio_client(server_params) as (read, write):
        async with ClientSession(read, write) as session:
            await session.initialize()

            # Récupère les outils disponibles
            tools_result = await session.list_tools()
            tools = [
                {
                    "name": tool.name,
                    "description": tool.description,
                    "input_schema": tool.inputSchema
                }
                for tool in tools_result.tools
            ]

            client = anthropic.Anthropic()
            messages = [{"role": "user", "content": user_question}]

            # Boucle d'agent avec tool use
            while True:
                response = client.messages.create(
                    model="claude-opus-4-7",
                    max_tokens=4096,
                    tools=tools,
                    messages=messages
                )

                if response.stop_reason == "end_turn":
                    # Réponse finale
                    for block in response.content:
                        if hasattr(block, "text"):
                            return block.text
                    break

                # Traite les appels d'outils
                tool_results = []
                for block in response.content:
                    if block.type == "tool_use":
                        result = await session.call_tool(
                            block.name,
                            block.input
                        )
                        tool_results.append({
                            "type": "tool_result",
                            "tool_use_id": block.id,
                            "content": result.content[0].text
                        })

                messages.append({"role": "assistant", "content": response.content})
                messages.append({"role": "user", "content": tool_results})

# Utilisation
result = asyncio.run(query_with_mcp(
    "Montre-moi les 5 utilisateurs les plus actifs du mois dernier"
))
print(result)
\`\`\`

## MCP dans l'écosystème 2025

L'adoption de MCP explose. En 2025, les serveurs MCP disponibles incluent :

| Serveur | Capacités |
|---------|-----------|
| **mcp-filesystem** | Lecture/écriture de fichiers locaux |
| **mcp-postgres** | Requêtes SQL sur PostgreSQL |
| **mcp-github** | Issues, PRs, code repositories |
| **mcp-slack** | Messages, canaux, notifications |
| **mcp-browser** | Navigation web automatisée |
| **mcp-aws** | S3, Lambda, EC2, DynamoDB |

## Pourquoi MCP est un game changer

1. **Standardisation** : Un serveur MCP fonctionne avec Claude, GPT-4, Llama et tout LLM compatible
2. **Sécurité** : Le serveur contrôle exactement ce que le LLM peut faire
3. **Découvrabilité** : Les outils s'auto-décrivent
4. **Composabilité** : Combinez plusieurs serveurs MCP

## Conclusion

MCP est en train de devenir le **standard de facto** pour les intégrations LLM. Si vous construisez des agents en 2025, investissez du temps pour maîtriser MCP — c'est une compétence qui va s'avérer indispensable.`,

    contentEn: `## What is MCP?

The **Model Context Protocol (MCP)** is an open-source protocol launched by Anthropic in November 2024. Its goal: standardize how LLMs interact with external tools, databases, and APIs.

Before MCP, every LLM-tool integration was ad-hoc. With MCP, you have a universal protocol: **an MCP server exposes capabilities, an LLM client consumes them**.

## MCP Architecture

\`\`\`
┌─────────────────┐     MCP Protocol      ┌──────────────────┐
│   LLM Client    │ ◄────────────────────► │   MCP Server     │
│  (Claude, etc.) │                        │  (your tools)    │
└─────────────────┘                        └──────────────────┘
         │                                          │
    Makes tool                                Exposes
    requests                                  Resources
                                              Tools
                                              Prompts
\`\`\`

MCP defines three primitives:
- **Resources**: static or dynamic data (files, DB)
- **Tools**: functions the LLM can call
- **Prompts**: reusable prompt templates

## Create your first MCP server

Here's an MCP server that exposes PostgreSQL database management tools:

\`\`\`python
from mcp.server import Server
from mcp.server.models import InitializationOptions
from mcp.server.stdio import stdio_server
from mcp.types import Tool, TextContent, Resource
import asyncpg
import json
import asyncio

server = Server("postgres-mcp-server")

DB_POOL = None

async def get_pool():
    global DB_POOL
    if not DB_POOL:
        DB_POOL = await asyncpg.create_pool(
            "postgresql://user:password@localhost/mydb"
        )
    return DB_POOL

@server.list_tools()
async def list_tools() -> list[Tool]:
    return [
        Tool(
            name="query_database",
            description="Executes a SELECT SQL query on the database",
            inputSchema={
                "type": "object",
                "properties": {
                    "query": {"type": "string", "description": "SQL query"},
                    "limit": {"type": "integer", "default": 10}
                },
                "required": ["query"]
            }
        )
    ]

@server.call_tool()
async def call_tool(name: str, arguments: dict) -> list[TextContent]:
    pool = await get_pool()
    if name == "query_database":
        query = arguments["query"]
        limit = arguments.get("limit", 10)
        if not query.strip().upper().startswith("SELECT"):
            return [TextContent(type="text", text="Error: Only SELECT queries are allowed")]
        async with pool.acquire() as conn:
            rows = await conn.fetch(f"{query} LIMIT {limit}")
            data = [dict(row) for row in rows]
            return [TextContent(type="text", text=json.dumps(data, default=str, indent=2))]
\`\`\`

## Why MCP is a game changer

1. **Standardization**: One MCP server works with Claude, GPT-4, Llama and any compatible LLM
2. **Security**: The server controls exactly what the LLM can do
3. **Discoverability**: Tools self-describe
4. **Composability**: Combine multiple MCP servers

## MCP in the 2025 ecosystem

MCP adoption is exploding. Available MCP servers in 2025 include filesystem access, PostgreSQL queries, GitHub integration, Slack messaging, browser automation, and AWS services.

## Conclusion

MCP is becoming the **de facto standard** for LLM integrations. If you're building agents in 2025, invest time to master MCP — it's a skill that will prove indispensable.`
  },

  {
    id: 3,
    slug: 'mlops-aws-pytorch',
    categoryFr: 'MLOps',
    categoryEn: 'MLOps',
    categoryColor: 'orange',
    emoji: '☁️',
    titleFr: 'MLOps sur AWS : déployer un modèle PyTorch en production',
    titleEn: 'MLOps on AWS: deploying a PyTorch model to production',
    excerptFr: "Guide complet pour entraîner, containeriser avec Docker et déployer un modèle ML sur AWS Lambda et EC2 avec CI/CD automatisé via GitHub Actions.",
    excerptEn: "Complete guide to training, containerizing with Docker, and deploying an ML model on AWS Lambda and EC2 with automated CI/CD via GitHub Actions.",
    date: '15 Mars 2025',
    dateEn: 'March 15, 2025',
    readTime: '11 min',
    tags: ['MLOps', 'AWS', 'PyTorch', 'Docker', 'Lambda', 'CI/CD'],
    contentFr: `## Architecture MLOps cible

Voici l'architecture que j'ai mise en place pour le pipeline MLOps d'AQGPT chez Kirusa :

\`\`\`
GitHub Push → GitHub Actions → Docker Build → ECR → Lambda/EC2
     │                                                      │
     └──────────── Tests automatiques ────────────────────┘
                         │
              S3 Model Storage ←──── SageMaker Training
\`\`\`

## Étape 1 : Entraînement du modèle avec PyTorch

\`\`\`python
import torch
import torch.nn as nn
from torch.utils.data import DataLoader, Dataset
import boto3
import mlflow
import os

class TextClassifier(nn.Module):
    def __init__(self, vocab_size: int, embed_dim: int, num_classes: int):
        super().__init__()
        self.embedding = nn.EmbeddingBag(vocab_size, embed_dim, sparse=True)
        self.fc = nn.Linear(embed_dim, num_classes)
        self.dropout = nn.Dropout(0.3)

    def forward(self, text, offsets):
        embedded = self.embedding(text, offsets)
        return self.fc(self.dropout(embedded))

def train_model(config: dict):
    """Pipeline d'entraînement avec tracking MLflow"""

    mlflow.set_tracking_uri(os.environ["MLFLOW_TRACKING_URI"])

    with mlflow.start_run():
        mlflow.log_params(config)

        model = TextClassifier(
            vocab_size=config["vocab_size"],
            embed_dim=config["embed_dim"],
            num_classes=config["num_classes"]
        )

        optimizer = torch.optim.AdamW(
            model.parameters(),
            lr=config["learning_rate"],
            weight_decay=0.01
        )

        scheduler = torch.optim.lr_scheduler.OneCycleLR(
            optimizer,
            max_lr=config["learning_rate"],
            total_steps=config["epochs"] * len(train_loader)
        )

        criterion = nn.CrossEntropyLoss()
        best_val_loss = float("inf")

        for epoch in range(config["epochs"]):
            # Training loop
            model.train()
            total_loss = 0
            for batch in train_loader:
                optimizer.zero_grad()
                output = model(batch["text"], batch["offsets"])
                loss = criterion(output, batch["labels"])
                loss.backward()
                torch.nn.utils.clip_grad_norm_(model.parameters(), 1.0)
                optimizer.step()
                scheduler.step()
                total_loss += loss.item()

            # Validation
            val_loss = evaluate(model, val_loader, criterion)
            mlflow.log_metrics({
                "train_loss": total_loss / len(train_loader),
                "val_loss": val_loss
            }, step=epoch)

            # Sauvegarde du meilleur modèle
            if val_loss < best_val_loss:
                best_val_loss = val_loss
                torch.save(model.state_dict(), "best_model.pt")

        # Upload vers S3
        s3 = boto3.client("s3")
        s3.upload_file(
            "best_model.pt",
            config["s3_bucket"],
            f"models/{config['model_name']}/best_model.pt"
        )
        mlflow.log_artifact("best_model.pt")

        print(f"Modèle sauvegardé. Best val loss: {best_val_loss:.4f}")
\`\`\`

## Étape 2 : Containerisation avec Docker

\`\`\`dockerfile
# Dockerfile pour Lambda (multi-stage build)
FROM public.ecr.aws/lambda/python:3.11 AS builder

# Dépendances système
RUN yum install -y gcc g++ make

# Copie et installation des dépendances
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt -t /packages

FROM public.ecr.aws/lambda/python:3.11

# Copie les packages installés
COPY --from=builder /packages /var/task

# Copie le code de l'application
COPY app/ /var/task/app/

# Télécharge le modèle depuis S3 au démarrage
COPY scripts/download_model.py /var/task/

ENV MODEL_BUCKET=your-ml-models-bucket
ENV MODEL_KEY=models/text-classifier/best_model.pt

CMD ["app.handler.lambda_handler"]
\`\`\`

\`\`\`python
# app/handler.py
import torch
import boto3
import json
import os
from app.model import TextClassifier
from app.preprocessing import preprocess_text

# Chargement du modèle (cold start optimisé)
model = None
s3_client = boto3.client("s3")

def load_model():
    global model
    if model is None:
        # Télécharge depuis S3 si pas en cache
        model_path = "/tmp/model.pt"
        if not os.path.exists(model_path):
            s3_client.download_file(
                os.environ["MODEL_BUCKET"],
                os.environ["MODEL_KEY"],
                model_path
            )

        model = TextClassifier(vocab_size=10000, embed_dim=128, num_classes=5)
        model.load_state_dict(torch.load(model_path, map_location="cpu"))
        model.eval()
    return model

def lambda_handler(event, context):
    """Handler Lambda pour inférence ML"""
    try:
        body = json.loads(event.get("body", "{}"))
        text = body.get("text", "")

        if not text:
            return {
                "statusCode": 400,
                "body": json.dumps({"error": "Text is required"})
            }

        clf = load_model()

        # Prétraitement
        tokens, offsets = preprocess_text(text)

        with torch.no_grad():
            output = clf(tokens, offsets)
            probabilities = torch.softmax(output, dim=1)
            prediction = torch.argmax(probabilities, dim=1).item()
            confidence = probabilities[0][prediction].item()

        return {
            "statusCode": 200,
            "body": json.dumps({
                "prediction": int(prediction),
                "confidence": float(confidence),
                "model_version": os.environ.get("MODEL_VERSION", "unknown")
            })
        }

    except Exception as e:
        return {
            "statusCode": 500,
            "body": json.dumps({"error": str(e)})
        }
\`\`\`

## Étape 3 : CI/CD avec GitHub Actions

\`\`\`yaml
# .github/workflows/ml-pipeline.yml
name: ML Training & Deployment Pipeline

on:
  push:
    branches: [main]
    paths:
      - 'ml/**'
      - 'app/**'

env:
  AWS_REGION: us-east-1
  ECR_REPOSITORY: text-classifier
  LAMBDA_FUNCTION: ml-inference

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Set up Python
        uses: actions/setup-python@v4
        with:
          python-version: '3.11'

      - name: Install dependencies
        run: pip install -r requirements-dev.txt

      - name: Run tests
        run: pytest tests/ -v --cov=app --cov-report=xml

      - name: Upload coverage
        uses: codecov/codecov-action@v3

  build-and-deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v4
        with:
          aws-access-key-id: \${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: \${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: \${{ env.AWS_REGION }}

      - name: Login to Amazon ECR
        id: login-ecr
        uses: aws-actions/amazon-ecr-login@v2

      - name: Build, tag, and push Docker image
        env:
          ECR_REGISTRY: \${{ steps.login-ecr.outputs.registry }}
          IMAGE_TAG: \${{ github.sha }}
        run: |
          docker build -t \$ECR_REGISTRY/\$ECR_REPOSITORY:\$IMAGE_TAG .
          docker push \$ECR_REGISTRY/\$ECR_REPOSITORY:\$IMAGE_TAG
          docker tag \$ECR_REGISTRY/\$ECR_REPOSITORY:\$IMAGE_TAG \
                     \$ECR_REGISTRY/\$ECR_REPOSITORY:latest
          docker push \$ECR_REGISTRY/\$ECR_REPOSITORY:latest

      - name: Deploy to Lambda
        run: |
          aws lambda update-function-code \
            --function-name \${{ env.LAMBDA_FUNCTION }} \
            --image-uri \$ECR_REGISTRY/\$ECR_REPOSITORY:latest

          aws lambda wait function-updated \
            --function-name \${{ env.LAMBDA_FUNCTION }}

          echo "✅ Déployé avec succès !"

      - name: Run smoke tests
        run: |
          aws lambda invoke \
            --function-name \${{ env.LAMBDA_FUNCTION }} \
            --payload '{"body": "{\"text\": \"Test de sanité\"}"}' \
            response.json
          cat response.json
\`\`\`

## Monitoring avec CloudWatch

\`\`\`python
import boto3
from datetime import datetime, timedelta

def get_model_metrics():
    """Récupère les métriques de performance du modèle"""
    cloudwatch = boto3.client("cloudwatch", region_name="us-east-1")

    metrics = cloudwatch.get_metric_statistics(
        Namespace="MLModel/TextClassifier",
        MetricName="Accuracy",
        StartTime=datetime.utcnow() - timedelta(hours=24),
        EndTime=datetime.utcnow(),
        Period=3600,
        Statistics=["Average"]
    )

    return metrics["Datapoints"]

def alert_on_drift(accuracy: float, threshold: float = 0.85):
    """Alerte si la précision tombe en dessous du seuil"""
    if accuracy < threshold:
        sns = boto3.client("sns")
        sns.publish(
            TopicArn="arn:aws:sns:us-east-1:123456789:ml-alerts",
            Subject="⚠️ Model Drift Detected",
            Message=f"Accuracy: {accuracy:.2%} < threshold: {threshold:.2%}"
        )
\`\`\`

## Résultats obtenus

| Métrique | Valeur |
|----------|--------|
| Latence P50 | 45ms |
| Latence P99 | 180ms |
| Throughput | 500 req/s |
| Disponibilité | 99.97% |
| Coût/1M requêtes | ~$0.80 |

## Conclusion

Ce pipeline MLOps m'a permis de réduire le temps de déploiement d'un modèle de **2 semaines à 20 minutes**. La clé est l'automatisation totale : du code à la production sans intervention manuelle.`,

    contentEn: `## Target MLOps Architecture

Here's the architecture I set up for the AQGPT MLOps pipeline at Kirusa:

\`\`\`
GitHub Push → GitHub Actions → Docker Build → ECR → Lambda/EC2
     │                                                      │
     └──────────── Automated Tests ────────────────────────┘
                         │
              S3 Model Storage ←──── SageMaker Training
\`\`\`

## Step 1: Model training with PyTorch

The training pipeline uses PyTorch with MLflow tracking. Key components: a TextClassifier neural network, AdamW optimizer with OneCycleLR scheduler, gradient clipping, and automatic best-model saving to S3.

## Step 2: Containerization with Docker

Multi-stage Docker build targeting AWS Lambda Python 3.11 runtime. The handler implements optimized cold-start with lazy model loading from S3 to /tmp cache.

## Step 3: CI/CD with GitHub Actions

The pipeline runs on push to main: tests → Docker build → ECR push → Lambda deploy → smoke tests. Full automation from code to production in under 20 minutes.

## Results achieved

| Metric | Value |
|--------|-------|
| P50 Latency | 45ms |
| P99 Latency | 180ms |
| Throughput | 500 req/s |
| Availability | 99.97% |
| Cost/1M requests | ~$0.80 |

## Conclusion

This MLOps pipeline reduced model deployment time from **2 weeks to 20 minutes**. The key is total automation: from code to production without manual intervention.`
  },

  {
    id: 4,
    slug: 'rag-pipeline-production',
    categoryFr: 'RAG & Embeddings',
    categoryEn: 'RAG & Embeddings',
    categoryColor: 'green',
    emoji: '🧠',
    titleFr: 'Construire un pipeline RAG production-ready avec LangChain et Pinecone',
    titleEn: 'Building a production-ready RAG pipeline with LangChain and Pinecone',
    excerptFr: "Comment j'ai construit un système RAG robuste pour AQGPT : chunking intelligent, embeddings optimisés, reranking et évaluation RAGAS.",
    excerptEn: "How I built a robust RAG system for AQGPT: intelligent chunking, optimized embeddings, reranking, and RAGAS evaluation.",
    date: '20 Février 2025',
    dateEn: 'February 20, 2025',
    readTime: '10 min',
    tags: ['RAG', 'LangChain', 'Pinecone', 'OpenAI', 'Python', 'RAGAS'],
    contentFr: `## Pourquoi le RAG naïf ne suffit pas

La plupart des tutoriels RAG vous montrent un pipeline basique : chunker un PDF, créer des embeddings, stocker dans une vector DB, récupérer les top-k chunks, générer une réponse.

**En production, ça ne marche pas bien.** J'ai appris ça à mes dépens sur AQGPT. Voici pourquoi et comment faire mieux.

## Les problèmes du RAG basique

1. **Chunks trop petits** : Perte de contexte, réponses fragmentées
2. **Chunks trop grands** : Bruit, informations non pertinentes
3. **Récupération naïve** : Les 5 chunks les plus proches ne sont pas forcément les plus utiles
4. **Pas d'évaluation** : Comment savoir si votre RAG est bon ?

## Architecture RAG avancée

\`\`\`
Documents → Preprocessing → Smart Chunking → Embeddings → Pinecone
                                                                │
Query → Query Expansion → Embedding → Retrieval → Reranking → LLM
                                          │
                              Hybrid Search (dense + sparse)
\`\`\`

## Étape 1 : Chunking intelligent

\`\`\`python
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.schema import Document
from typing import List
import re

class SmartChunker:
    """Chunker avec overlap contextuel et metadata enrichie"""

    def __init__(self, chunk_size: int = 512, chunk_overlap: int = 128):
        self.splitter = RecursiveCharacterTextSplitter(
            chunk_size=chunk_size,
            chunk_overlap=chunk_overlap,
            separators=[
                "\\n\\n",  # Paragraphes (priorité haute)
                "\\n",     # Lignes
                ". ",      # Phrases
                "? ",
                "! ",
                ", ",
                " ",
                ""
            ],
            length_function=len,
            is_separator_regex=False
        )

    def chunk_with_context(self, documents: List[Document]) -> List[Document]:
        """Ajoute le contexte du document parent à chaque chunk"""
        enriched_chunks = []

        for doc in documents:
            chunks = self.splitter.split_documents([doc])

            for i, chunk in enumerate(chunks):
                # Enrichissement des métadonnées
                chunk.metadata.update({
                    "chunk_index": i,
                    "total_chunks": len(chunks),
                    "source": doc.metadata.get("source", "unknown"),
                    "section": self._extract_section(chunk.page_content),
                    "has_code": bool(re.search(r"code_block", chunk.page_content)),
                    "is_first": i == 0,
                    "is_last": i == len(chunks) - 1
                })

                # Contexte parent pour les petits chunks
                if len(chunk.page_content) < 200 and i > 0:
                    chunk.page_content = (
                        f"[Contexte: {chunks[i-1].page_content[:100]}...] "
                        + chunk.page_content
                    )

                enriched_chunks.append(chunk)

        return enriched_chunks

    def _extract_section(self, text: str) -> str:
        """Extrait le titre de section si présent"""
        lines = text.split("\\n")
        for line in lines[:3]:
            if line.startswith("#") or (len(line) < 80 and line.isupper()):
                return line.strip("# ").strip()
        return "content"
\`\`\`

## Étape 2 : Embeddings et stockage Pinecone

\`\`\`python
from langchain_openai import OpenAIEmbeddings
from langchain_pinecone import PineconeVectorStore
from pinecone import Pinecone, ServerlessSpec
import hashlib

class RAGIndexer:
    def __init__(self, index_name: str = "aqgpt-knowledge"):
        self.embeddings = OpenAIEmbeddings(
            model="text-embedding-3-large",  # 3072 dimensions
            dimensions=1536  # Réduction pour économiser les coûts
        )

        # Initialisation Pinecone
        pc = Pinecone(api_key=os.environ["PINECONE_API_KEY"])

        if index_name not in [i.name for i in pc.list_indexes()]:
            pc.create_index(
                name=index_name,
                dimension=1536,
                metric="cosine",
                spec=ServerlessSpec(cloud="aws", region="us-east-1")
            )

        self.vectorstore = PineconeVectorStore(
            index=pc.Index(index_name),
            embedding=self.embeddings,
            text_key="text"
        )

    def index_documents(self, chunks: List[Document]) -> None:
        """Indexe les chunks avec déduplication"""
        # Déduplication par hash du contenu
        unique_chunks = {}
        for chunk in chunks:
            content_hash = hashlib.md5(
                chunk.page_content.encode()
            ).hexdigest()
            if content_hash not in unique_chunks:
                unique_chunks[content_hash] = chunk

        unique_list = list(unique_chunks.values())

        # Indexation par batch
        batch_size = 100
        for i in range(0, len(unique_list), batch_size):
            batch = unique_list[i:i + batch_size]
            self.vectorstore.add_documents(batch)
            print(f"Indexé {min(i + batch_size, len(unique_list))}/{len(unique_list)}")
\`\`\`

## Étape 3 : Retrieval hybride + Reranking

\`\`\`python
from langchain.retrievers import ContextualCompressionRetriever
from langchain.retrievers.document_compressors import CrossEncoderReranker
from langchain_community.cross_encoders import HuggingFaceCrossEncoder
from langchain.retrievers import EnsembleRetriever
from langchain_community.retrievers import BM25Retriever

class HybridRAGRetriever:
    """Combine dense + sparse retrieval avec reranking"""

    def __init__(self, vectorstore, documents: List[Document]):
        # Retriever dense (semantic)
        dense_retriever = vectorstore.as_retriever(
            search_type="mmr",  # Maximum Marginal Relevance
            search_kwargs={
                "k": 10,
                "fetch_k": 30,
                "lambda_mult": 0.7  # Diversité vs pertinence
            }
        )

        # Retriever sparse (BM25 keyword)
        sparse_retriever = BM25Retriever.from_documents(documents)
        sparse_retriever.k = 10

        # Combinaison avec poids
        ensemble = EnsembleRetriever(
            retrievers=[dense_retriever, sparse_retriever],
            weights=[0.7, 0.3]  # 70% semantic, 30% keyword
        )

        # Reranker cross-encoder
        cross_encoder = HuggingFaceCrossEncoder(
            model_name="cross-encoder/ms-marco-MiniLM-L-6-v2"
        )
        reranker = CrossEncoderReranker(model=cross_encoder, top_n=5)

        self.retriever = ContextualCompressionRetriever(
            base_compressor=reranker,
            base_retriever=ensemble
        )

    def retrieve(self, query: str, filters: dict = None) -> List[Document]:
        return self.retriever.invoke(query)
\`\`\`

## Étape 4 : Évaluation avec RAGAS

\`\`\`python
from ragas import evaluate
from ragas.metrics import (
    answer_relevancy,
    faithfulness,
    context_recall,
    context_precision
)
from datasets import Dataset

def evaluate_rag_pipeline(rag_chain, test_dataset: List[dict]):
    """Évalue le pipeline RAG sur des métriques RAGAS"""

    results = []
    for item in test_dataset:
        response = rag_chain.invoke(item["question"])
        results.append({
            "question": item["question"],
            "answer": response["answer"],
            "contexts": [doc.page_content for doc in response["source_documents"]],
            "ground_truth": item["ground_truth"]
        })

    dataset = Dataset.from_list(results)

    scores = evaluate(
        dataset=dataset,
        metrics=[
            answer_relevancy,
            faithfulness,
            context_recall,
            context_precision
        ]
    )

    print("\\n📊 RAGAS Evaluation Results:")
    print(f"  Answer Relevancy:  {scores['answer_relevancy']:.3f}")
    print(f"  Faithfulness:      {scores['faithfulness']:.3f}")
    print(f"  Context Recall:    {scores['context_recall']:.3f}")
    print(f"  Context Precision: {scores['context_precision']:.3f}")

    return scores
\`\`\`

## Résultats sur AQGPT

Après ces optimisations :

| Métrique RAGAS | Avant | Après |
|---------------|-------|-------|
| Answer Relevancy | 0.72 | **0.91** |
| Faithfulness | 0.68 | **0.89** |
| Context Recall | 0.61 | **0.85** |
| Context Precision | 0.74 | **0.88** |

## Conclusion

Un bon RAG en production nécessite : chunking contextuel, hybrid search, reranking et évaluation continue. Ces 4 éléments ont fait passer AQGPT d'un outil passable à un système fiable.`,

    contentEn: `## Why naive RAG isn't enough

Most RAG tutorials show a basic pipeline: chunk a PDF, create embeddings, store in a vector DB, retrieve top-k chunks, generate a response. **In production, it doesn't work well.** Here's why and how to do better.

## Advanced RAG Architecture

\`\`\`
Documents → Preprocessing → Smart Chunking → Embeddings → Pinecone
                                                                │
Query → Query Expansion → Embedding → Retrieval → Reranking → LLM
                                          │
                              Hybrid Search (dense + sparse)
\`\`\`

The key improvements: smart chunking with context enrichment, hybrid dense+sparse retrieval (70/30 weighting), cross-encoder reranking, and continuous RAGAS evaluation.

## Results on AQGPT

After these optimizations:

| RAGAS Metric | Before | After |
|-------------|--------|-------|
| Answer Relevancy | 0.72 | **0.91** |
| Faithfulness | 0.68 | **0.89** |
| Context Recall | 0.61 | **0.85** |
| Context Precision | 0.74 | **0.88** |

## Conclusion

Good production RAG requires: contextual chunking, hybrid search, reranking, and continuous evaluation. These 4 elements transformed AQGPT from a mediocre tool to a reliable system.`
  },

  {
    id: 5,
    slug: 'qlora-finetuning-llms',
    categoryFr: 'Fine-tuning LLM',
    categoryEn: 'LLM Fine-tuning',
    categoryColor: 'red',
    emoji: '⚡',
    titleFr: 'QLoRA : Fine-tuner un LLM 7B sur GPU consumer',
    titleEn: 'QLoRA: Fine-tuning a 7B LLM on consumer GPU',
    excerptFr: "Guide pratique pour fine-tuner Llama 3.1 7B avec QLoRA sur une RTX 3090 : quantization 4-bit, LoRA adapters, et déploiement avec Ollama.",
    excerptEn: "Practical guide to fine-tuning Llama 3.1 7B with QLoRA on an RTX 3090: 4-bit quantization, LoRA adapters, and deployment with Ollama.",
    date: '10 Janvier 2025',
    dateEn: 'January 10, 2025',
    readTime: '12 min',
    tags: ['QLoRA', 'Llama', 'Fine-tuning', 'PEFT', 'Transformers', 'HuggingFace'],
    contentFr: `## Qu'est-ce que QLoRA ?

**QLoRA** (Quantized Low-Rank Adaptation) combine deux techniques :
1. **Quantization 4-bit** : Compresse les poids du modèle (7B → ~4GB VRAM)
2. **LoRA** : Fine-tune seulement des matrices de bas rang additionnelles (<1% des paramètres)

Résultat : fine-tuner un modèle 7B en **moins de 24GB de VRAM** avec une qualité quasi-équivalente au fine-tuning complet.

## Configuration de l'environnement

\`\`\`bash
pip install transformers==4.44.0
pip install peft==0.12.0
pip install bitsandbytes==0.43.3
pip install trl==0.10.1
pip install datasets==3.0.0
pip install accelerate==0.34.0
pip install wandb
\`\`\`

## Dataset : format Alpaca

\`\`\`python
from datasets import Dataset
import json

def prepare_dataset(raw_data: list[dict]) -> Dataset:
    """Formate les données en Alpaca chat template"""

    def format_example(example: dict) -> dict:
        # Format instruction-following
        if example.get("input"):
            prompt = f"""### Instruction:
{example['instruction']}

### Input:
{example['input']}

### Response:
{example['output']}"""
        else:
            prompt = f"""### Instruction:
{example['instruction']}

### Response:
{example['output']}"""

        return {"text": prompt}

    dataset = Dataset.from_list(raw_data)
    return dataset.map(format_example, remove_columns=dataset.column_names)

# Exemple de données pour fine-tuner sur des tâches d'analyse de documents
training_data = [
    {
        "instruction": "Analyse ce contrat et identifie les clauses risquées",
        "input": "CONTRAT DE PRESTATION - Article 3: Le prestataire renonce à tout droit...",
        "output": "CLAUSES RISQUÉES IDENTIFIÉES:\\n1. Renonciation aux droits (Art. 3)..."
    },
    # ... 1000+ exemples
]

dataset = prepare_dataset(training_data)
\`\`\`

## Fine-tuning avec QLoRA

\`\`\`python
import torch
from transformers import (
    AutoModelForCausalLM,
    AutoTokenizer,
    BitsAndBytesConfig,
    TrainingArguments
)
from peft import LoraConfig, get_peft_model, TaskType
from trl import SFTTrainer
import wandb

# Configuration quantization 4-bit
bnb_config = BitsAndBytesConfig(
    load_in_4bit=True,
    bnb_4bit_use_double_quant=True,   # Double quantization pour + d'économies
    bnb_4bit_quant_type="nf4",         # NF4 = meilleur pour poids normaux
    bnb_4bit_compute_dtype=torch.bfloat16
)

# Chargement du modèle de base
model_id = "meta-llama/Meta-Llama-3.1-8B-Instruct"

model = AutoModelForCausalLM.from_pretrained(
    model_id,
    quantization_config=bnb_config,
    device_map="auto",
    trust_remote_code=True
)
model.config.use_cache = False  # Nécessaire pour gradient checkpointing

tokenizer = AutoTokenizer.from_pretrained(model_id)
tokenizer.pad_token = tokenizer.eos_token
tokenizer.padding_side = "right"

# Configuration LoRA
lora_config = LoraConfig(
    r=16,                    # Rang des matrices LoRA (16-64 en pratique)
    lora_alpha=32,           # Scaling factor (= 2*r)
    target_modules=[         # Modules à adapter (attention + feedforward)
        "q_proj", "k_proj", "v_proj", "o_proj",
        "gate_proj", "up_proj", "down_proj"
    ],
    lora_dropout=0.05,
    bias="none",
    task_type=TaskType.CAUSAL_LM
)

model = get_peft_model(model, lora_config)
model.print_trainable_parameters()
# Output: trainable params: 41,943,040 || all params: 8,072,556,544 (0.52%)

# Arguments d'entraînement
training_args = TrainingArguments(
    output_dir="./llama3-finetuned",
    num_train_epochs=3,
    per_device_train_batch_size=4,
    gradient_accumulation_steps=4,    # Batch effectif = 16
    gradient_checkpointing=True,
    optim="paged_adamw_32bit",
    logging_steps=25,
    save_strategy="epoch",
    learning_rate=2e-4,
    bf16=True,
    tf32=True,
    max_grad_norm=0.3,
    warmup_ratio=0.03,
    lr_scheduler_type="cosine",
    report_to="wandb",
    dataloader_num_workers=4
)

# Trainer SFT (Supervised Fine-Tuning)
trainer = SFTTrainer(
    model=model,
    args=training_args,
    train_dataset=dataset,
    dataset_text_field="text",
    max_seq_length=2048,
    tokenizer=tokenizer,
    packing=True  # Optimise l'utilisation de la VRAM
)

wandb.init(project="llama3-qlora-finetuning")
trainer.train()
trainer.save_model("./llama3-finetuned-final")
\`\`\`

## Fusion des poids et déploiement

\`\`\`python
from peft import PeftModel
import torch

def merge_and_export(base_model_id: str, adapter_path: str, output_path: str):
    """Fusionne les adaptateurs LoRA dans le modèle de base"""

    # Charge le modèle de base en float16 (pas quantifié pour la fusion)
    base_model = AutoModelForCausalLM.from_pretrained(
        base_model_id,
        torch_dtype=torch.float16,
        device_map="auto"
    )

    # Charge et fusionne les adaptateurs LoRA
    model = PeftModel.from_pretrained(base_model, adapter_path)
    model = model.merge_and_unload()  # Fusion permanente

    # Sauvegarde au format GGUF pour Ollama
    model.save_pretrained(output_path)
    tokenizer.save_pretrained(output_path)

    print(f"Modèle fusionné sauvegardé dans {output_path}")

merge_and_export(
    "meta-llama/Meta-Llama-3.1-8B-Instruct",
    "./llama3-finetuned-final",
    "./llama3-merged"
)
\`\`\`

## Utilisation mémoire (RTX 3090 - 24GB)

| Composant | VRAM utilisée |
|-----------|--------------|
| Modèle 4-bit | ~4.5 GB |
| Activations | ~3.2 GB |
| Gradients LoRA | ~0.8 GB |
| Optimizer states | ~2.1 GB |
| **Total** | **~10.6 GB** |

## Conclusion

QLoRA a démocratisé le fine-tuning de LLMs. Avec ~$0.50/heure sur une instance AWS g4dn.xlarge, vous pouvez fine-tuner un modèle 7B en quelques heures. C'est accessible à tout ML engineer sérieux.`,

    contentEn: `## What is QLoRA?

**QLoRA** (Quantized Low-Rank Adaptation) combines two techniques:
1. **4-bit quantization**: Compresses model weights (7B → ~4GB VRAM)
2. **LoRA**: Only fine-tunes small additional low-rank matrices (<1% of parameters)

Result: fine-tune a 7B model in **less than 24GB VRAM** with near-equivalent quality to full fine-tuning.

## Key Configuration

The setup uses BitsAndBytesConfig with NF4 4-bit quantization and double quantization for extra savings. LoRA targets attention and feedforward projection matrices with rank 16, covering only 0.52% of total parameters (41M trainable out of 8B total).

## Memory Usage (RTX 3090 - 24GB)

| Component | VRAM Used |
|-----------|-----------|
| 4-bit model | ~4.5 GB |
| Activations | ~3.2 GB |
| LoRA gradients | ~0.8 GB |
| Optimizer states | ~2.1 GB |
| **Total** | **~10.6 GB** |

## Conclusion

QLoRA democratized LLM fine-tuning. With ~$0.50/hour on an AWS g4dn.xlarge instance, you can fine-tune a 7B model in a few hours. It's accessible to every serious ML engineer.`
  },

  {
    id: 6,
    slug: 'django-rest-api-docker',
    categoryFr: 'Backend',
    categoryEn: 'Backend',
    categoryColor: 'teal',
    emoji: '🐍',
    titleFr: 'Django REST API production-ready avec Docker et PostgreSQL',
    titleEn: 'Production-ready Django REST API with Docker and PostgreSQL',
    excerptFr: "Architecture complète d'une API Django REST Framework : authentification JWT, permissions granulaires, tests, Docker Compose et déploiement AWS EC2.",
    excerptEn: "Complete Django REST Framework API architecture: JWT authentication, granular permissions, tests, Docker Compose, and AWS EC2 deployment.",
    date: '5 Décembre 2024',
    dateEn: 'December 5, 2024',
    readTime: '10 min',
    tags: ['Django', 'DRF', 'PostgreSQL', 'Docker', 'JWT', 'AWS'],
    contentFr: `## Pourquoi cette stack ?

Chez Kirusa, j'utilise Django REST Framework pour toutes nos APIs backend. Voici pourquoi : performance, sécurité par défaut, ORM puissant, et un écosystème mature.

## Structure du projet

\`\`\`
backend/
├── config/
│   ├── settings/
│   │   ├── base.py
│   │   ├── development.py
│   │   └── production.py
│   ├── urls.py
│   └── wsgi.py
├── apps/
│   ├── users/
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── views.py
│   │   ├── permissions.py
│   │   └── tests/
│   └── core/
├── docker/
│   ├── Dockerfile
│   └── docker-compose.yml
└── requirements/
    ├── base.txt
    └── production.txt
\`\`\`

## Modèle utilisateur personnalisé

\`\`\`python
# apps/users/models.py
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.db import models
import uuid

class UserManager(BaseUserManager):
    def create_user(self, email: str, password: str, **kwargs):
        if not email:
            raise ValueError("Email is required")
        email = self.normalize_email(email)
        user = self.model(email=email, **kwargs)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email: str, password: str, **kwargs):
        kwargs.setdefault("is_staff", True)
        kwargs.setdefault("is_superuser", True)
        return self.create_user(email, password, **kwargs)

class User(AbstractBaseUser, PermissionsMixin):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    date_joined = models.DateTimeField(auto_now_add=True)

    # Champs métier
    role = models.CharField(
        max_length=20,
        choices=[("admin", "Admin"), ("user", "User"), ("analyst", "Analyst")],
        default="user"
    )

    objects = UserManager()
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["first_name", "last_name"]

    class Meta:
        db_table = "users"
        indexes = [models.Index(fields=["email", "role"])]

    def __str__(self):
        return f"{self.first_name} {self.last_name} <{self.email}>"
\`\`\`

## API Views avec DRF

\`\`\`python
# apps/users/views.py
from rest_framework import generics, status, permissions
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.viewsets import ModelViewSet
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from .serializers import UserSerializer, LoginSerializer
from .permissions import IsOwnerOrAdmin

class AuthViewSet(ModelViewSet):
    """Endpoints d'authentification JWT"""
    serializer_class = UserSerializer

    @action(detail=False, methods=["post"], permission_classes=[permissions.AllowAny])
    def register(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            refresh = RefreshToken.for_user(user)
            return Response({
                "user": UserSerializer(user).data,
                "tokens": {
                    "refresh": str(refresh),
                    "access": str(refresh.access_token)
                }
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=["post"], permission_classes=[permissions.AllowAny])
    def login(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = authenticate(
            email=serializer.validated_data["email"],
            password=serializer.validated_data["password"]
        )

        if not user:
            return Response(
                {"error": "Invalid credentials"},
                status=status.HTTP_401_UNAUTHORIZED
            )

        refresh = RefreshToken.for_user(user)
        return Response({
            "user": UserSerializer(user).data,
            "tokens": {
                "refresh": str(refresh),
                "access": str(refresh.access_token)
            }
        })

    @action(detail=False, methods=["post"])
    def refresh_token(self, request):
        try:
            refresh = RefreshToken(request.data["refresh"])
            return Response({"access": str(refresh.access_token)})
        except Exception:
            return Response(
                {"error": "Invalid refresh token"},
                status=status.HTTP_401_UNAUTHORIZED
            )
\`\`\`

## Permissions granulaires

\`\`\`python
# apps/users/permissions.py
from rest_framework.permissions import BasePermission, SAFE_METHODS

class IsOwnerOrAdmin(BasePermission):
    """Autorisation : propriétaire de la ressource ou admin"""

    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True
        if hasattr(obj, "user"):
            return obj.user == request.user or request.user.is_staff
        return obj == request.user or request.user.is_staff

class IsAnalystOrAdmin(BasePermission):
    """Nécessite le rôle analyst ou admin"""

    def has_permission(self, request, view):
        return (
            request.user.is_authenticated and
            request.user.role in ["analyst", "admin"] or
            request.user.is_staff
        )
\`\`\`

## Docker Compose complet

\`\`\`yaml
# docker/docker-compose.yml
version: '3.9'

services:
  db:
    image: postgres:16-alpine
    volumes:
      - postgres_data:/var/lib/postgresql/data
    environment:
      POSTGRES_DB: \${DB_NAME:-appdb}
      POSTGRES_USER: \${DB_USER:-postgres}
      POSTGRES_PASSWORD: \${DB_PASSWORD}
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U \${DB_USER:-postgres}"]
      interval: 5s
      timeout: 5s
      retries: 5

  redis:
    image: redis:7-alpine
    command: redis-server --requirepass \${REDIS_PASSWORD}
    volumes:
      - redis_data:/data

  api:
    build:
      context: ..
      dockerfile: docker/Dockerfile
    command: >
      sh -c "python manage.py migrate &&
             python manage.py collectstatic --no-input &&
             gunicorn config.wsgi:application
             --bind 0.0.0.0:8000
             --workers 4
             --timeout 120
             --access-logfile -"
    volumes:
      - static_volume:/app/staticfiles
    environment:
      - DATABASE_URL=postgresql://\${DB_USER}:\${DB_PASSWORD}@db:5432/\${DB_NAME}
      - REDIS_URL=redis://:\${REDIS_PASSWORD}@redis:6379/0
      - SECRET_KEY=\${SECRET_KEY}
      - DEBUG=False
    depends_on:
      db:
        condition: service_healthy
    ports:
      - "8000:8000"

  celery:
    build:
      context: ..
      dockerfile: docker/Dockerfile
    command: celery -A config worker -l info --concurrency=4
    environment:
      - DATABASE_URL=postgresql://\${DB_USER}:\${DB_PASSWORD}@db:5432/\${DB_NAME}
      - REDIS_URL=redis://:\${REDIS_PASSWORD}@redis:6379/0
    depends_on:
      - redis
      - api

  nginx:
    image: nginx:alpine
    volumes:
      - ./nginx.conf:/etc/nginx/conf.d/default.conf
      - static_volume:/static
    ports:
      - "80:80"
      - "443:443"
    depends_on:
      - api

volumes:
  postgres_data:
  redis_data:
  static_volume:
\`\`\`

## Tests avec pytest-django

\`\`\`python
# apps/users/tests/test_auth.py
import pytest
from rest_framework.test import APIClient
from django.urls import reverse
from apps.users.models import User

@pytest.fixture
def api_client():
    return APIClient()

@pytest.fixture
def create_user(db):
    def make_user(**kwargs):
        defaults = {
            "email": "test@example.com",
            "first_name": "Test",
            "last_name": "User",
            "password": "SecurePass123!"
        }
        defaults.update(kwargs)
        return User.objects.create_user(**defaults)
    return make_user

class TestAuthentication:
    def test_register_success(self, api_client):
        response = api_client.post(reverse("auth-register"), {
            "email": "new@example.com",
            "first_name": "New",
            "last_name": "User",
            "password": "SecurePass123!"
        })
        assert response.status_code == 201
        assert "tokens" in response.data
        assert "access" in response.data["tokens"]

    def test_login_success(self, api_client, create_user):
        user = create_user()
        response = api_client.post(reverse("auth-login"), {
            "email": "test@example.com",
            "password": "SecurePass123!"
        })
        assert response.status_code == 200
        assert "tokens" in response.data

    def test_login_invalid_credentials(self, api_client, create_user):
        create_user()
        response = api_client.post(reverse("auth-login"), {
            "email": "test@example.com",
            "password": "WrongPassword"
        })
        assert response.status_code == 401
\`\`\`

## Conclusion

Cette stack Django + DRF + Docker + PostgreSQL est celle que j'utilise en production chez Kirusa. Elle gère actuellement des milliers de requêtes par jour avec une disponibilité de 99.9%+.`,

    contentEn: `## Why this stack?

At Kirusa, I use Django REST Framework for all our backend APIs. The reasons: performance, security by default, powerful ORM, and a mature ecosystem.

## Key Architecture Points

The project uses a custom User model with UUID primary keys, role-based permissions (user/analyst/admin), JWT authentication via SimpleJWT, and Docker Compose for local and production environments.

The API is built with ViewSets and custom actions, feature-based permissions, and comprehensive pytest test coverage targeting 90%+ across all endpoints.

## Conclusion

This Django + DRF + Docker + PostgreSQL stack is what I use in production at Kirusa. It currently handles thousands of requests per day with 99.9%+ availability.`
  }
]

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find(a => a.slug === slug)
}

export function getRelatedArticles(article: Article, count = 2): Article[] {
  return articles
    .filter(a => a.slug !== article.slug)
    .sort(() => Math.random() - 0.5)
    .slice(0, count)
}
