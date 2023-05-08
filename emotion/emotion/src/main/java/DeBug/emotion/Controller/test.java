package DeBug.emotion.Controller;


import lombok.extern.slf4j.Slf4j;
import org.apache.http.HttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.json.JSONObject;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@CrossOrigin("*")
public class test {

    @RequestMapping("/test")
    public String Test(@RequestParam("BCID")String id) {

        String URI = "http://10.20.92.36:9900/z/"+id;
        CloseableHttpClient httpClient = HttpClients.createDefault();
        HttpGet request = new HttpGet(URI);
        request.addHeader("accept", "application/json");

        try {
            HttpResponse response = httpClient.execute(request);
            String jsonString = EntityUtils.toString(response.getEntity());
            JSONObject json = new JSONObject(jsonString);
            return "200";
        }catch (Exception e ){
            return "400";
        }
    }
    @RequestMapping("/test2")
    public String Test2(String json) {
        System.out.println(json);
        return "200";
    }

    @RequestMapping("/test3")
    public String Test3(@RequestParam("BCID")String id) {

        String URI = "http://localhost:9000/z/"+id;
        CloseableHttpClient httpClient = HttpClients.createDefault();
        HttpGet request = new HttpGet(URI);
        request.addHeader("accept", "application/json");

        try {
            HttpResponse response = httpClient.execute(request);
            return "200";
        }catch (Exception e ){
            return "400";
        }
    }
}
