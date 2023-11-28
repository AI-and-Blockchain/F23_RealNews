import pprint
import google.generativeai as palm

palm.configure(api_key='AIzaSyBDweceTvXjWmBrHo28i1vyWQzaeHUXaSI')
def run(statement):
    models = [m for m in palm.list_models() if 'generateText' in m.supported_generation_methods]
    model = models[0].name
    print(model)
    #statements to evaluate can only evalute 3 at once
    preprompt = """
    Please follow these guidelines to evaluate the following statements and provide sources for your claims:

    Use credible and reliable sources, such as academic journals, reputable news organizations, or government websites.
    Avoid using biased or unreliable sources, such as personal blogs, social media posts, or websites with an agenda.
    If you cannot find a source to support or contradict a statement, indicate that you were unable to verify the statement.
    Statements to evaluate:

        """
    prompt = preprompt +statement
    print(prompt)

    completion = palm.generate_text(
        model=model,
        prompt=prompt,
        temperature=0,
        # The maximum length of the response
        max_output_tokens=800,
    )
    #print(completion.result)
    return completion.result
def bardFactcheck(query):
    res = run(query)
    return res


if __name__ == "__main__":
    #enter test query
    query = "is the earth flat?"
    print(bardFactcheck(query))

