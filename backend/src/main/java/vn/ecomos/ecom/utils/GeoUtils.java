package vn.ecomos.ecom.utils;

import vn.ecomos.ecom.base.mongo.DefaultMongoConfiguration;
import vn.ecomos.ecom.enums.GeoType;
import vn.ecomos.ecom.model.geo.Geo;
import vn.ecomos.ecom.manager.GeoManager;

import java.util.HashMap;
import java.util.List;
import java.util.Random;

public class GeoUtils {
    static DefaultMongoConfiguration mongoConfiguration = new DefaultMongoConfiguration();

    private static GeoManager geoManager = new GeoManager(mongoConfiguration.mongoClient());


    public static HashMap<String, String> generateGeo() {
        List<Geo> provinces = geoManager.getGeoType(GeoType.PROVINCE);
        Geo geoProvince = provinces.get(new Random().nextInt(provinces.size() - 1));
        List<Geo> districts = geoManager.getGeoParent(GeoType.DISTRICT, geoProvince.getGhn_id());
        Geo geoDistrict = districts.get(new Random().nextInt(districts.size() - 1));
        List<Geo> geoWards = geoManager.getGeoParent(GeoType.WARD, geoDistrict.getGhn_id());
        Geo geoWard = geoWards.get(new Random().nextInt(geoWards.size()-1));
        HashMap<String, String> map = new HashMap<String, String>();
        map.put("address", geoWard.getName() + ", " + geoDistrict.getName() + ", " + geoProvince.getName());
        map.put("province", String.valueOf(geoProvince.getGhn_id()));
        map.put("district", String.valueOf(geoDistrict.getGhn_id()));
        map.put("ward", String.valueOf(geoWard.getGhn_id()));
        return map;

    }
}
